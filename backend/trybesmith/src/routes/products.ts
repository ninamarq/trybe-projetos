import { Router } from 'express';

import ProductsController from '../controllers/products';

import { validateAmount, validateName } from '../middlewares/products';

const ProductsRouter = Router();

const productsControllers = new ProductsController();

ProductsRouter.get('/products', productsControllers.getAll);

const middlewaresPostProduct = [
  validateAmount,
  validateName,
];

ProductsRouter.post('/products', middlewaresPostProduct, productsControllers.postProduct);

export default ProductsRouter;