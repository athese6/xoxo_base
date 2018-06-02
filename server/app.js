const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const useragent = require('express-useragent');
const requestIp = require('request-ip');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jso = require('json-override');
const logger = require('morgan');
const proxy = require('http-proxy-middleware');
const webpackHot = require('webpack-hot-middleware');
const minifyHTML = require('express-minify-html');
const compression = require('compression');
const i18n = require('./lib/i18n');
const ioredis = require('./lib/ioredis');
const services = require('./services');
const routes = require('./routes');
const passport = services.Passport();
const config = require('../config/config.js');
const usersRouter = require('./routes/users');
const {webpackCompiler} = require("./lib/bundler");

const app = express();

// force ssl
if (config.ssl.enable) {
    app.use((req, res, next) => {
        if (!req.secure) {
            return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
        }
        next();
    });
}

app.use((req, res, next) => {
    const host = req.get('Host');
    if (host === 'www.hapoom.co') {
        if (config.ssl.enable) {
            return res.redirect(301, 'https://hapoom.co' + req.url);
        } else {
            return res.redirect(301, 'http://hapoom.co' + req.url);
        }
    }
    next();
});

if (config.webpack.optimize) {
    app.use(minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true,
            useShortDoctype: true
        }
    }));
    app.use(compression());
}

// config.express(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


config.webpack.hotReload && app.use(webpackHot(webpackCompiler));

app.use(logger('dev'));
app.use(bodyParser.json({limit: config.app.requestLimit}));
app.use(bodyParser.urlencoded({limit: config.app.requestLimit, extended: true}));

app.use(cookieParser());
app.use(requestIp.mw());
app.use(useragent.express());
app.use(i18n.init);
i18n.configure();

// session
let user_session = jso(config.session, {}, true);
delete user_session.cookie.rememberMe; // set only if remember me
if (ioredis.enabled) {
    user_session.store = ioredis.getSessionStore(session);
}
const user_session_init = session(user_session);
app.use(user_session_init);
const passport_initialize = passport.initialize();
app.use(passport_initialize);
const passport_session = passport.session();
app.use(passport_session);

// force current locale to user locale if this locale is available
const rethinkdb = proxy('http://localhost:8080/');
const rethinkdb_path = "/rethinkdb";
app.use(rethinkdb_path, (req, res, next) => {
    if (req.originalUrl === rethinkdb_path) return res.redirect(301, rethinkdb_path + "/");
    // add your own security here ;)
    // if (req.isAuthenticated() && (req.user.role === models.Constants.UserRole.admin || config.admins.includes(req.user.email))) {
    if (!req.isAuthenticated()) {
        return rethinkdb(req, res, next);
    }
    next();
});


app.use('/', express.static('public'));
app.use('/', express.static('build_dev'));
// other static resources should just be served as they are
// router.use(express.static(
//     path.resolve(__dirname, '..', '..', 'build'),
//     {maxAge: '30d'},
// ));


app.use(routes);
app.use('/users', usersRouter);

app.get('/api/hello', (req, res) => {
    res.send({express: 'Hello From Express213'});
});

/****** error handlers ******/
// catch 404 and forward to error handler or redirect
app.use((req, res, next) => {
    if (req.xhr) {
        return next();
    }
    // res.status(404);
    // res.render("error");
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
});

// ajax error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (req.xhr) {
        return res.json({"error": err});
    }
    next(err);
});

// html error handler
app.use((err, req, res, next) => {
    if (config.isProduction()) {
        res.redirect("/");
        res.status(404);
        res.send(err.message);
    } else {
        // res.send();
        res.status(404);
        res.send(err.message);
    }
});
module.exports = app;
