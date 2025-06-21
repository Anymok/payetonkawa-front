const request = require('supertest');
const express = require('express');
const { getOrderById } = require('../src/controller/order_controller');
const { createDbConnection } = require('../database');

jest.mock('../database');

const app = express();
app.get('/order/:id', getOrderById); 

describe('GET /order/:id', () => {
  let pool;

  beforeAll(() => {
    pool = { query: jest.fn() };
    createDbConnection.mockResolvedValue(pool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 200 with the order details and products', async () => {
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
        }
      ]
    };

    pool.query.mockResolvedValue(mockResults);

    const res = await request(app).get('/order/1'); // Replace with the ID you want to test

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
      }
    ]);
  });

  it('should return a 400 on database error', async () => {
    const errorMessage = 'Database error';
    pool.query.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).get('/order/1'); 

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ "error": errorMessage });
  });
});
