const productsModels = require('../models/products.models');

const getAll = async () => productsModels.getProducts();

const getById = async (id) => productsModels.getProductById(id);

const postProduct = async (body) => productsModels.postProduct(body);

const putProduct = async (body) => productsModels.updateProduct(body);

const deleteProduct = async (id) => productsModels.deleteProduct(id);

module.exports = {
    getAll,
    getById,
    postProduct,
    putProduct,
    deleteProduct,
};
