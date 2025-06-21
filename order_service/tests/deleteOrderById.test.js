const request = require('supertest');
const express = require('express');
const { deleteOrder } = require('../src/controller/order_controller'); // Replace with actual path
const { createDbConnection } = require('../database');

jest.mock('../database');

const app = express();
app.delete('/orders/:id', deleteOrder); // Replace with your route

describe('DELETE /orders/:id', () => {
  let pool;

  beforeAll(() => {
    pool = { query: jest.fn() };
    createDbConnection.mockResolvedValue(pool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete an existing order and return 201', async () => {
    const mockParamsId = 1;

    // Mock the deleteOrderProductById query to simulate successful deletion
    pool.query.mockResolvedValueOnce();

    // Mock the deleteOrderById query to simulate successful deletion
    pool.query.mockResolvedValueOnce();

    const res = await request(app)
      .delete(`/orders/${mockParamsId}`);

    expect(res.status).toBe(201);
    expect(res.text).toBe('La commande a bien été supprimée');
  });

  it('should return 400 on database error', async () => {
    const mockParamsId = 1;
    const errorMessage = 'Database error';

    // Mock the deleteOrderProductById query to simulate successful deletion
    pool.query.mockResolvedValueOnce();

    // Mock the deleteOrderById query to simulate a database error
    pool.query.mockRejectedValueOnce(new Error(errorMessage));

    const res = await request(app)
      .delete(`/orders/${mockParamsId}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ "error": errorMessage });
  });
});
