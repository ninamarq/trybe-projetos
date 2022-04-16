const express = require('express');

const categoriesControllers = require('../controllers/categories');

const categoriesMiddlewares = require('../middlewares/categories');
const usersMiddleware = require('../middlewares/users');

const categoryRoute = express.Router();

const validatePostCat = [
  categoriesMiddlewares.validateName,
  usersMiddleware.validateToken,
];

categoryRoute.post('/', validatePostCat,
  categoriesControllers.postCategory);

categoryRoute.get('/', usersMiddleware.validateToken,
  categoriesControllers.getCategories);

module.exports = categoryRoute;
