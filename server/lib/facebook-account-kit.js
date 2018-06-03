const accountkit = require("node-account-kit");

const m = {
    accountkit: accountkit,
    init: () => {
        accountkit.set(process.env.REACT_APP_FACEBOOK_APP_ACCOUNT_KIT_API_VERSION, process.env.REACT_APP_FACEBOOK_APP_ID, process.env.REACT_APP_FACEBOOK_APP_ACCOUNT_KIT_SECRET);
        accountkit.requireAppSecret(true); // if you have enabled this option, default = true
    }
};

module.exports = m;
