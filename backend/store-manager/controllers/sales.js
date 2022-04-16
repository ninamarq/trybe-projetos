const salesServices = require('../services/sales');

const getSales = async (_req, res, next) => {
  try {
    const sales = await salesServices.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [sale] = await salesServices.getById(id);
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const postSales = async (req, res, next) => {
  try {
    const sale = await salesServices.postSalesProducts(req.body);
    return res.status(201).json(sale);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateSalesProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesServices.updateSales(id);
    req.body.forEach(async (sale) => {
      const { productId, quantity } = sale;
      await salesServices.updateSalesProducts(id, productId, quantity);
    });
    const returnBody = {
      saleId: id,
      itemUpdated: req.body,
    };
    return res.status(200).json(returnBody);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getSales,
  getSaleById,
  postSales,
  updateSalesProducts,
};
