const queries = require('../model/order_model');
const { createDbConnection } = require('../../database');
const axios = require('axios');

const getOrders = async (req, res) => {
  try {
    const pool = await createDbConnection();
    const results = await pool.query(queries.getAllOrders);

    const orders = results.rows.reduce((acc, row) => {
      const order = acc.find(order => order.id === row.order_id);
      if (order) {
        if (row.product_id) {
          order.products.push({
            id: row.product_id,
            name: row.product_name,
            price: row.price,
            description: row.description,
            stock: row.stock,
            category: row.category,
            brand: row.brand,
            rating: row.rating,
            characteristic: row.characteristic
          });
        }
      } else {
        acc.push({
          id: row.order_id,
          date: row.date,
          customer_id: row.id_customer,
          products: row.product_id ? [{
            id: row.product_id,
            name: row.product_name,
            price: row.price,
            description: row.description,
            stock: row.stock,
            category: row.category,
            brand: row.brand,
            rating: row.rating,
            characteristic: row.characteristic
          }] : []
        });
      }
      return acc;
    }, []);

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
};

const getOrderById = async (req, res) => {
    try {
      const pool = await createDbConnection();
      const results = await pool.query(queries.getOrderById, [req.params.id]);
  
      const order = results.rows.reduce((acc, row) => {
        const order = acc.find(order => order.id === row.order_id);
        if (order) {
          if (row.product_id) {
            order.products.push({
              id: row.product_id,
              name: row.product_name,
              price: row.price,
              description: row.description,
              stock: row.stock,
              category: row.category,
              brand: row.brand,
              rating: row.rating,
              characteristic: row.characteristic
            });
          }
        } else {
          acc.push({
            id: row.order_id,
            date: row.date,
            customer_id: row.id_customer,
            products: row.product_id ? [{
              id: row.product_id,
              name: row.product_name,
              price: row.price,
              description: row.description,
              stock: row.stock,
              category: row.category,
              brand: row.brand,
              rating: row.rating,
              characteristic: row.characteristic,
            }] : []
          });
        }
        return acc;
      }, []);
  
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ "error": error.message });
    }
  };  

  const createOrder = async (req, res) => {
    try {
      const { date, idProducts } = req.body;
      const sid = req.tokenData.sid;
      const pool = await createDbConnection();
  
      const response = await axios.get(`http://localhost:3004/api/customer/${sid}`, {
        headers: {
          'Authorization': req.headers.authorization,
        }
      });
  
      const orderResult = await pool.query(queries.createOrder, [date, sid]);
      const order = orderResult.rows[0];
  
      await Promise.all(idProducts.map(item => {
        return pool.query(queries.associateOrderProduct, [order.id, item]);
      }));
  
      res.status(201).send("Commande créée avec succès");
    } catch (error) {
      res.status(500).send({ "error": error.message });
    }
  };
  

const updateOrderById = async (req, res) => {
    try {
      const { date } = req.body;
      const pool = await createDbConnection();
  
      const results = await pool.query(queries.getOrderById, [req.params.id]);
      if (results.rows.length === 0) {
        res.status(404).send("La commande n'existe pas");
        return;
      }
  
      await pool.query(queries.updateOrderById, [date, req.params.id]);
      res.status(201).send("Commande modifiée avec succès");
    } catch (error) {
      res.status(400).json({ "error": error.message });
    }
  };
  

  const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await createDbConnection();
      await pool.query(queries.deleteOrderProductById, [id]);
      await pool.query(queries.deleteOrderById, [id]);
      res.status(201).send("La commande a bien été supprimée");
    } catch (error) {
      res.status(400).json({ "error": error.message });
    }
  };
  

module.exports = { 
  getOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrder
}