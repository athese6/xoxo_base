const config = require("../config/config.js");

// start
if (config.isProduction) {
    // require("../server/main");
} else {
    require('./bundle')
        .then(() => require("../server/main"));
}
