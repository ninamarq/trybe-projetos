const salesServices = require('../services/sales');

const validateSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [sale] = await salesServices.getById(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validatePostPutSale = async (req, res, next) => {
  try {
    const sales = req.body;
    const checkingProductId = sales.some((sale) => sale.productId === undefined);
    const checkingQuantity = sales.some((sale) => sale.quantity === undefined);
    if (checkingProductId) return res.status(400).json({ message: '"productId" is required' });
    if (checkingQuantity) return res.status(400).json({ message: '"quantity" is required' });
    const checkingQuantityValue = sales.some((sale) => sale.quantity <= 0);
    if (checkingQuantityValue) {
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
  validateSaleById,
  validatePostPutSale,
};
