const express = require('express');

const productsController = require('../controllers/products');

const productsMiddlewares = require('../middlewares/products');

const productRoute = express.Router();

const validateProduct = [
  productsMiddlewares.validateQuantityProduct,
  productsMiddlewares.validateNameProduct,
];

productRoute.get('/', productsController.getProducts);

productRoute.get('/:id', productsMiddlewares.validateProductById,
  productsController.getProductById);

productRoute.post('/', validateProduct, productsMiddlewares.validatePostProduct,
  productsController.postProduct);

productRoute.put('/:id', productsMiddlewares.validateProductById, validateProduct,
  productsController.updateProduct);

productRoute.delete('/:id', productsMiddlewares.validateProductById,
  productsController.deleteProduct);

module.exports = productRoute;
