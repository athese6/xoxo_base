// default environment
const {clearWebpackOutputDir, bundleWebpackClient} = require('../server/lib/bundler');
const {checkVersions} = require('../server/lib/system');
const config = require('../config/config.js');

// run our Promises sequentially
module.exports = checkVersions()
    .then(() => config.webpack.clearOutput ? clearWebpackOutputDir() : true)
    .then(bundleWebpackClient);
