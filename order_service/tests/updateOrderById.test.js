const request = require('supertest');
const express = require('express');
const { updateOrderById } = require('../src/controller/order_controller'); // Replace with actual path
const { createDbConnection } = require('../database');

jest.mock('../database');

const app = express();
app.use(express.json()); // Required to parse JSON requests
app.put('/orders/:id', updateOrderById); // Replace with your route

describe('PUT /orders/:id', () => {
  let pool;

  beforeAll(() => {
    pool = { query: jest.fn() };
    createDbConnection.mockResolvedValue(pool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update an existing order and return 201', async () => {
    const mockDate = '2023-01-01';
    const mockParamsId = 1;

    // Mock the getOrderById query to simulate an existing order
    pool.query.mockResolvedValueOnce({
      rows: [{ id: mockParamsId }]
    });

    // Mock the updateOrderById query to simulate a successful update
    pool.query.mockResolvedValueOnce();

    const res = await request(app)
      .put(`/orders/${mockParamsId}`)
      .send({ date: mockDate });

    expect(res.status).toBe(201);
    expect(res.text).toBe('Commande modifiée avec succès');
  });

  it('should return 404 if order does not exist', async () => {
    const mockDate = '2023-01-01';
    const mockParamsId = 1;

    // Mock the getOrderById query to simulate non-existing order
    pool.query.mockResolvedValueOnce({
      rows: []
    });

    const res = await request(app)
      .put(`/orders/${mockParamsId}`)
      .send({ date: mockDate });

    expect(res.status).toBe(404);
    expect(res.text).toBe("La commande n'existe pas");
  });

  it('should return 400 on database error', async () => {
    const mockDate = '2023-01-01';
    const mockParamsId = 1;
    const errorMessage = 'Database error';

    // Mock the getOrderById query to simulate an existing order
    pool.query.mockResolvedValueOnce({
      rows: [{ id: mockParamsId }]
    });

    // Mock the updateOrderById query to simulate a database error
    pool.query.mockRejectedValueOnce(new Error(errorMessage));

    const res = await request(app)
      .put(`/orders/${mockParamsId}`)
      .send({ date: mockDate });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ "error": errorMessage });
  });
});
