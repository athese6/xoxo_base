const config = require("../config/config.js");

// start

if (config.isProduction) {
    require('./bundle')
        .then(() => require("../server/main"));
    // require("../server/main");
} else {
    require('./bundle')
        .then(() => require("../server/main"));
}
