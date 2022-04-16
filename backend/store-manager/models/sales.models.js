const DB = require('./connection.models');

const getSales = async () => {
  try {
    const SQL = (`SELECT
      sale_prod.sale_id AS saleId,
      sales.date,
      sale_prod.product_id AS productId,
      sale_prod.quantity
      FROM StoreManager.sales_products AS sale_prod
      JOIN StoreManager.sales AS sales
      WHERE sale_prod.sale_id = sales.id
      GROUP BY sale_prod.sale_id, sale_prod.product_id, sale_prod.quantity, sales.date
      ORDER BY sale_prod.sale_id, sale_prod.product_id;`
    );
    const [result] = await DB.execute(SQL);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getSaleById = async (id) => {
  try {
    const SQL = (`SELECT
      sales.date,
      sale_prod.product_id AS productId,
      sale_prod.quantity
      FROM StoreManager.sales_products AS sale_prod
      JOIN StoreManager.sales AS sales
      WHERE sale_prod.sale_id = (?)
      GROUP BY sale_prod.sale_id, sale_prod.product_id, sale_prod.quantity, sales.date
      ORDER BY sale_prod.sale_id, sale_prod.product_id;`
    );
    const result = await DB.execute(SQL, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const postSales = async () => {
  try {
    const SQL = `INSERT INTO StoreManager.sales
    (date) VALUES (NOW());`;
    const [result] = await DB.execute(SQL);
    return result; 
  } catch (error) {
    console.log(error);
  }
};

const postSalesProducts = async (insertId, productId, quantity) => {
  try {
    const SQL = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES
    (?, ?, ?);`;
    const [result] = await DB.execute(SQL, [insertId, productId, quantity]);
    console.log(result);
    return result;    
  } catch (error) {
    console.log(error);
  }
};

const updateSales = async (id) => {
  try {
    const SQL = `UPDATE StoreManager.sales
    SET date = (NOW())
    WHERE id = ?;`;
    const [result] = await DB.execute(SQL, [id]);
    return result; 
  } catch (error) {
    console.log(error);
  }
};

const updateSalesProducts = async (id, productId, quantity) => {
  try {
    const SQL = `UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?;`;
    const [result] = await DB.execute(SQL, [productId, quantity, id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSales,
  getSaleById,
  postSales,
  postSalesProducts,
  updateSales,
  updateSalesProducts,
};
