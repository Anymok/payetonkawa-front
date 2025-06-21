const { createDbConnection } = require('../../database');
const queries = require('../model/customer_model.js');

const getAllCustomers = async (req, res) => {
  try {
    const pool = await createDbConnection();
    const results = await pool.query(queries.getAllCustomers);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const pool = await createDbConnection();
    let results = await pool.query(queries.getCustomerById, [req.params.idUser]);
    if (results.rows.length === 0) {
      console.log("Customer not in database");

      results = await pool.query(queries.createCustomer, [req.tokenData.sid, req.tokenData.name, req.tokenData.preferred_username]);
    }
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
};

const getCustomerOrdersList = async (req, res) => {
  try {
    const pool = await createDbConnection();
    const results = await pool.query(queries.getCustomerOrdersList, [req.params.idUser]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
};

const createCustomer = async (req, res) => {
  try {
    const pool = await createDbConnection();
    const result = await pool.query(queries.createCustomer, [req.tokenData.sid, req.tokenData.name, req.tokenData.preferred_username]);
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  getCustomerOrdersList,
  createCustomer
};
