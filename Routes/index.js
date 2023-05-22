const express = require('express');
const UserController = require('../Controllers/UserController');
const checkAuth = require('../Middlewares/checkAuth');
const router = express.Router();

router.get('/', checkAuth, UserController.getUserInformation)
router.post('/register', UserController.signUpUser)
router.post('/login', UserController.login)

module.exports = router;
