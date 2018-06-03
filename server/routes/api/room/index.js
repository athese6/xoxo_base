const express = require('express');
const router = express.Router();
const i18n = require('../../../lib/i18n');
const services = require("../../../services");
//
// router.get('/get-rooms/:gender', (req, res, next) => {
//   const gender = req.params.gender;
//
//   return services.Room.getRooms(gender)
//     .then(room => res.json({room: room}))
//     .catch(error => {
//       console.log(error);
//       return res.json({error: error});
//     });
// });

router.post('/get-rooms', (req, res, next) => {
    const filter = req.body.filter || {};
    if (!!filter.house_number) {
        filter.house_number = parseInt(filter.house_number);
    }
    return services.Room.getRooms(filter)
        .then(room => res.json({room: room}))
        .catch(error => {
            console.log(error);
            return res.json({error: error});
        });
});
module.exports = router;
