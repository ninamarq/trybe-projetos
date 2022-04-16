const productsServices = require('../services/products');

const getProducts = async (_req, res, next) => {
  try {
    const products = await productsServices.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [product] = await productsServices.getById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const products = await productsServices.getAll();
    const id = products.length + 1;
    await productsServices.postProduct({ id, name, quantity });
    return res.status(201).json({ id, name, quantity });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const body = { id, name, quantity };
    await productsServices.putProduct(body);
    return res.status(200).json(body);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsServices.deleteProduct(id);
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
