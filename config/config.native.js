const jso = require('json-override');

console.log("native process.env.NODE_ENV = " + process.env.NODE_ENV);
console.log("native process.env.BABEL_ENV = " + process.env.BABEL_ENV);
let dependConfig;
dependConfig = require('./config.native.json');
const config = jso(require('./config.json'), dependConfig);

config.express = app => {
    const settings = config.app;
    for (const prop in settings) {
        const val = settings[prop];
        app.set(prop, val);
    }
    // return process.env.NODE_ENV === 'production';
};

config.isProduction = true;//process.env.NODE_ENV === 'production';

module.exports = config;
