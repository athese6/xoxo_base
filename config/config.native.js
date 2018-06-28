const jso = require('json-override');
const Config = require('react-native-config');
console.log("native process.env.NODE_ENV = " + process.env.NODE_ENV);
console.log("native Config.BUILD_MODE = " + Config.BUILD_MODE);
let dependConfig;
if (Config.BUILD_MODE == "production") {
    dependConfig = require('./config.native.prod.json');
} else {
    dependConfig = require('./config.native.dev.json');
}
const config = jso(require('./config.native.json'), dependConfig);

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
