const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middlewares/auth');
require('dotenv').config();

var usersController = require('../controllers/users');


router.post('/user/registration', usersController.userRegistration);
router.delete('/user/delete/:userId', checkAuth, usersController.userDelete);
router.post('/user/login', usersController.userLogin);


module.exports = router;