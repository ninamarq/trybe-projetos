const jwt = require('jsonwebtoken');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { User } = require('../models');

const decodingId = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const decodedId = decoded.data.id;
  return decodedId;
};

const createPost = async (body, headers) => {
  const { title, content, categoryIds } = body;
  const { authorization } = headers;
  const userId = decodingId(authorization);
  const objResponse = await BlogPost.create({
    title, content, categoryIds, userId, published: new Date(), updated: new Date(),
  });
  return objResponse;
};

const allPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
     },
     {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
     }],
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: [{ model: User,
    as: 'user',
    attributes: { exclude: ['password'] } },
     { model: Category,
      as: 'categories',
      through: { attributes: [] },
     }] });
  return post;
};

module.exports = {
  createPost,
  allPosts,
  getPostById,
};