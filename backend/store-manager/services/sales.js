const salesModels = require('../models/sales.models');

const getAll = async () => salesModels.getSales();

const getById = async (id) => salesModels.getSaleById(id);

const postSalesProducts = async (body) => {
  const sale = await salesModels.postSales();
  const returnBody = {
    id: sale.insertId,
    itemsSold: body,
  };
  body.forEach(async (trade) => {
    await salesModels.postSalesProducts(sale.insertId, trade.productId, trade.quantity);
  });
  return returnBody;
};

const updateSales = async (id) => salesModels.updateSales(id);

const updateSalesProducts = async (id, productId, quantity) => {
  await salesModels.updateSalesProducts(id, productId, quantity);
};

module.exports = {
  getAll,
  getById,
  postSalesProducts,
  updateSales,
  updateSalesProducts,
};
