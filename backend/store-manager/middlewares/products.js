const productsServices = require('../services/products');

const validateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getById(id);
    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validatePostProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const products = await productsServices.getAll();
    const checkName = products.some((prod) => prod.name === name);
    if (checkName) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateNameProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return res
        .status(422)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateQuantityProduct = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (quantity < 1) {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  validateProductById,
  validatePostProduct,
  validateNameProduct,
  validateQuantityProduct,
};
