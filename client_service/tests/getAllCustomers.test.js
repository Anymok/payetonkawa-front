const request = require('supertest');
const express = require('express');
const { getAllCustomers } = require('../src/controller/customer_controller');
const { createDbConnection } = require('../database');

jest.mock('../database');
jest.mock('../src/model/customer_model', () => ({
    getAllCustomers: "SELECT * FROM customers"
}));

const app = express();
app.get('/customer', getAllCustomers);

describe('GET /customer', () => {
    let pool;

    beforeAll(() => {
        pool = { query: jest.fn() };
        createDbConnection.mockResolvedValue(pool);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a 200 with all customers', async () => {
        const mockResults = {
            rows: [
                {
                    id: 'd6e2bcff-f872-4082-b87f-6125f2a68823',
                    name: 'name',
                    email: "test@example.com",
                    password: '123'
                }
            ]
        };

        pool.query.mockResolvedValue(mockResults);

        const res = await request(app).get('/customer');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 'd6e2bcff-f872-4082-b87f-6125f2a68823',
                name: 'name',
                email: "test@example.com",
                password: '123'
            },
        ]);
    });

    it('should return a 400 on database error', async () => {
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        const res = await request(app).get('/customer');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ "error": errorMessage });
    });
});
