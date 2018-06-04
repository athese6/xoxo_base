const jso = require('json-override');

let dependConfig;
if (process.env.NODE_ENV === 'production') {
    dependConfig = require('./config.prod.json');
}
else {
    dependConfig = require('./config.dev.json');
}
const config = jso(require('./config.json'), dependConfig);

config.express = app => {
    const settings = config.app;
    for (const prop in settings) {
        const val = settings[prop];
        app.set(prop, val);
    }
    // return process.env.NODE_ENV === 'production';
};

config.isProduction = process.env.NODE_ENV === 'production';

module.exports = config;
