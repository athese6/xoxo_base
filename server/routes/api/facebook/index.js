const express = require('express');
const router = express.Router();
const i18n = require('../../../lib/i18n');
const accountkit = require('../../../lib/facebook-account-kit');

router.get('/get-csrf', (req, res) => {
    //accountKitState and accountKitCode are the response thet we get from account kit login operation. look for sample app for more usage information.
    const csrf = accountkit.accountkit.getRandomState();
    return res.json({csrf: csrf});
});

router.post('/get-phone', (req, res) => {
    //accountKitState and accountKitCode are the response thet we get from account kit login operation. look for sample app for more usage information.
    accountkit.accountkit.getUserData(res, req.body.state, req.body.code, function (resp) {
        if (resp.phone && resp.phone.national_number) {
            if (resp.phone.national_number[0] != "0") {
                resp.phone.kr_number = "0" + resp.phone.national_number;
            } else {
                resp.phone.kr_number = resp.phone.national_number;
            }
        }
        res.send(resp);
    });
});

module.exports = router;
