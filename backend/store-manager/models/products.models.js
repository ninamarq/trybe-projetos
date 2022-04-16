const DB = require('./connection.models');

const getProducts = async () => {
  const SQL = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [result] = await DB.execute(SQL);
  return result;
};

const getProductById = async (id) => {
  try {
    const SQL = 'SELECT * FROM StoreManager.products WHERE id = (?);';
    const [result] = await DB.execute(SQL, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const postProduct = async (body) => {
  try {
    const { name, quantity } = body;
    const SQL = `INSERT INTO StoreManager.products
    (name, quantity) VALUES (?, ?);`;
    const [result] = await DB.execute(SQL, [name, quantity]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (body) => {
  try {
    const { id, name, quantity } = body;
    const SQL = `UPDATE StoreManager.products
      SET name = ?, quantity = ?
      WHERE id = ?`;
    const [result] = await DB.execute(SQL, [name, quantity, id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const SQL = `DELETE FROM StoreManager.products
      WHERE id = ?;`;
    const [result] = await DB.execute(SQL, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
