const services = require('../services/categories');

const postCategory = async (req, res, next) => {
  try {
    const newCategory = await services.createCategory(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await services.allCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postCategory,
  getCategories,
};
