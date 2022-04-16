const { Category } = require('../models');

const validatePost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }
    if (!categoryIds) {
      return res.status(400).json({ message: '"categoryIds" is required' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateCategorys = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    const categoriesInData = await Category.findAll();
    const categoriesFiltered = categoriesInData.map((element) => element.dataValues.id);
    const checkIdInData = categoryIds.every((element) => categoriesFiltered.includes(element));
    if (!checkIdInData) {
      res.status(400).send({ message: '"categoryIds" not found' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  validatePost,
  validateCategorys,
};
