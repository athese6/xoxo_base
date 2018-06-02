const thinky = require("..//thinky");

const models = {
    Constants: require("./constants"),
    User: require("./user"),
    Browser: require("./browser"),
    Error: require("./error")
};

// initial data
const Promise = require("bluebird");
const config = require("../../config/config.js");
const data = require("../data/default.json");
// const data = config.isProduction() ? require("../../data/production.json") : require("../data/default.json");
const dataPromises = Object.keys(data).map(key => models[key].save(data[key], {conflict: 'update'}));

thinky.dbReady()
    .then(() => Promise.each(dataPromises, results => console.log))
    .catch(console.log);

module.exports = models;


