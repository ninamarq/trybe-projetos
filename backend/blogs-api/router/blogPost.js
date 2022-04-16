const express = require('express');

const blogPostControllers = require('../controllers/blogPost');

const blogPostMiddlewares = require('../middlewares/blogPost');
const usersMiddleware = require('../middlewares/users');

const blogPostRoute = express.Router();

const validatePost = [
  blogPostMiddlewares.validatePost,
  usersMiddleware.validateToken,
  blogPostMiddlewares.validateCategorys,
];

blogPostRoute.post('/', validatePost, blogPostControllers.postBlog);

blogPostRoute.get('/', usersMiddleware.validateToken, blogPostControllers.getPosts);

blogPostRoute.get('/:id', usersMiddleware.validateToken, blogPostControllers.getById);

module.exports = blogPostRoute;
