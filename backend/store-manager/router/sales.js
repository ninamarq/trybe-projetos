const express = require('express');

const salesController = require('../controllers/sales');

const salesMiddlewares = require('../middlewares/sales');

const saleRoute = express.Router();

saleRoute.get('/', salesController.getSales);

saleRoute.get('/:id', salesMiddlewares.validateSaleById,
  salesController.getSaleById);

saleRoute.post('/', salesMiddlewares.validatePostPutSale, salesController.postSales);

saleRoute.put('/:id', salesMiddlewares.validateSaleById,
  salesMiddlewares.validatePostPutSale, salesController.updateSalesProducts);

module.exports = saleRoute;
