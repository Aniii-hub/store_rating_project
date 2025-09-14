const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
router.post('/signup', auth.signupValidators, auth.signup);
router.post('/login', auth.loginValidators, auth.login);
module.exports = router;
