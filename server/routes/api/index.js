const express = require('express');
const router = express.Router();

router.use("/auth", require('./auth'));
router.use("/user", require('./user'));
router.use("/room", require('./room'));
router.use("/facebook", require('./facebook'));

module.exports = router;
