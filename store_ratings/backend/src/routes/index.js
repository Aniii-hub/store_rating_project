const express = require('express');
const router = express.Router();
router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/stores', require('./stores'));
module.exports = router;
