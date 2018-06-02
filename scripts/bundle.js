// default environment
const {clearWebpackOutputDir, bundleWebpackClient} = require('../server/lib/bundler');
const {checkVersions} = require('../server/lib/system');
const config = require('../config/config.js');
const fs = require('fs-extra');
const paths = require('../config/paths');


function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml,
    });
}

// run our Promises sequentially
module.exports = checkVersions()
    .then(() => config.webpack.clearOutput ? clearWebpackOutputDir() : true)
    .then(bundleWebpackClient)
    .then(copyPublicFolder);
