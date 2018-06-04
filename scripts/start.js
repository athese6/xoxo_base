const config = require("../config/config.js");

if (config.isProduction) {
    require("../server/main");
} else {
    require('./bundle')
        .then(() => require("../server/main"));
}
