const { createDbConnection } = require('../../database');
const queries = require('../model/inventory_model');

const getStockProduct = async (req, res) => {
  try {
    const pool = await createDbConnection();
    const results = await pool.query(queries.getStockProduct, [req.params.idProduct]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
};

const createStock = async (req, res) => {
  try {
    const { idProduct, quantity } = req.body;
    const pool = await createDbConnection();
    await pool.query(queries.createStock, [idProduct, quantity]);
    res.status(201).send("Inventory created with success");
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};

const updateStockProduct = async (req, res) => {
  try {
    const { quantity } = req.body;
    const pool = await createDbConnection();
    await pool.query(queries.updateStockProduct, [quantity, req.params.idProduct]);
    res.status(200).send("Inventory updated with success");
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};

const deleteStockProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const pool = await createDbConnection();
    await pool.query(queries.deleteStockProduct, [idProduct]);
    res.status(200).send("Inventory deleted with success");
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};

module.exports = {
  getStockProduct,
  updateStockProduct,
  createStock,
  deleteStockProduct
};