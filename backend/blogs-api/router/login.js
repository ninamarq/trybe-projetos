const express = require('express');

const loginControllers = require('../controllers/login');

const loginMiddlewares = require('../middlewares/login');

const validateLogin = [
  loginMiddlewares.validateEmail,
  loginMiddlewares.validatePassword,
];

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, loginControllers.signIn);

module.exports = loginRoute;
