const request = require('supertest');
const express = require('express');
const { getOrders } = require('../src/controller/order_controller');
const { createDbConnection } = require('../database');

jest.mock('../database');
jest.mock('../src/model/order_model', () => ({
  getAllOrders: "SELECT orders.id AS order_id, orders.date, orders.id_customer, "+
  "product.id AS product_id, product.name AS product_name, product.price, " +
  "product.description, product.stock, product.category, product.brand, product.rating, product.characteristic " +
  "FROM orders " +
  "LEFT JOIN order_product ON orders.id = order_product.id_order " +
  "LEFT JOIN product ON order_product.id_product = product.id "
}));

const app = express();
app.get('/order', getOrders);

describe('GET /order', () => {
  let pool;

  beforeAll(() => {
    pool = { query: jest.fn() };
    createDbConnection.mockResolvedValue(pool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 200 with all orders and their products', async () => {
    const mockResults = {
      rows: [
        {
          order_id: 1,
          date: '2023-01-01',
          id_customer: 1,
          product_id: 1,
          product_name: 'Product A',
          price: 100,
          description: 'Description A',
          stock: 10,
          category: 'Category A',
          brand: 'Brand A',
          rating: 4.5,
          characteristic: 'Characteristic A'
        },
        {
          order_id: 1,
          date: '2023-01-01',
          id_customer: 1,
          product_id: 2,
          product_name: 'Product B',
          price: 150,
          description: 'Description B',
          stock: 20,
          category: 'Category B',
          brand: 'Brand B',
          rating: 4.0,
          characteristic: 'Characteristic B'
        },
        {
          order_id: 2,
          date: '2023-01-02',
          id_customer: 2,
          product_id: null,
          product_name: null,
          price: null,
          description: null,
          stock: null,
          category: null,
          brand: null,
          rating: null,
          characteristic: null
        }
      ]
    };

    pool.query.mockResolvedValue(mockResults);

    const res = await request(app).get('/order');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        date: '2023-01-01',
        customer_id: 1,
        products: [
          {
            id: 1,
            name: 'Product A',
            price: 100,
            description: 'Description A',
            stock: 10,
            category: 'Category A',
            brand: 'Brand A',
            rating: 4.5,
            characteristic: 'Characteristic A'
          },
          {
            id: 2,
            name: 'Product B',
            price: 150,
            description: 'Description B',
            stock: 20,
            category: 'Category B',
            brand: 'Brand B',
            rating: 4.0,
            characteristic: 'Characteristic B'
          }
        ]
      },
      {
        id: 2,
        date: '2023-01-02',
        customer_id: 2,
        products: []
      }
    ]);
  });

  it('should return a 400 on database error', async () => {
    const errorMessage = 'Database error';
    pool.query.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).get('/order');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ "error": errorMessage });
  });
});
