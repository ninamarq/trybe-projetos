const express = require('express');

const usersControllers = require('../controllers/users');

const usersMiddlewares = require('../middlewares/users');

const userRoute = express.Router();

const validatePost = [
  usersMiddlewares.validateDisplayName,
  usersMiddlewares.validateEmail,
  usersMiddlewares.validatePassword,
];

userRoute.post('/', validatePost, usersControllers.postUser);

userRoute.get('/', usersMiddlewares.validateToken, usersControllers.getUsers);

userRoute.get('/:id', usersMiddlewares.validateToken, usersControllers.getUserById);

module.exports = userRoute;
