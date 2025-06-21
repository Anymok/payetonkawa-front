const queries = require('../model/product_model');
const { createDbConnection } = require('../../database');

const getAllProduct = async (req, res) => {
  try {
    const pool = await createDbConnection();
    const results = await pool.query(queries.getAllProduct);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const pool = await createDbConnection();
    const results = await pool.query(queries.getProduct, [req.params.idProduct]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category, brand, rating, characteristic } = req.body;
    const pool = await createDbConnection();
    await pool.query(queries.createProduct, [name, price, description, stock, category, brand, rating, characteristic]);
    res.status(201).send("Product created with success");
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category, brand, rating, characteristic } = req.body;
    const pool = await createDbConnection();
    await pool.query(queries.updateProduct, [name, price, description, stock, category, brand, rating, characteristic, req.params.idProduct]);
    res.status(200).send("Product updated with success");
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const pool = await createDbConnection();
    await pool.query(queries.deleteProduct, [idProduct]);
    res.status(200).send("Product deleted with success");
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};

module.exports = {
  getAllProduct,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct
};