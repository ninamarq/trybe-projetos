const { Category } = require('../models');

const createCategory = async (body) => {
  const { name } = body;
  const newCategory = await Category.create({ name });

  return newCategory;
};

const allCategories = async () => {
  const categories = await Category.findAll();
  
  return categories;
};

module.exports = {
  createCategory,
  allCategories,
};