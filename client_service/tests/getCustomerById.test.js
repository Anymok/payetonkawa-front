const request = require('supertest');
const express = require('express');
const { getCustomerById } = require('../src/controller/customer_controller');
const { createDbConnection } = require('../database');

jest.mock('../database');

const app = express();
app.get('/customer/:id', getCustomerById);

describe('GET /customer/:id', () => {
    let pool;

    beforeAll(() => {
        pool = { query: jest.fn() };
        createDbConnection.mockResolvedValue(pool);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a 200 with the customer details', async () => {
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

        const res = await request(app).get('/customer/d6e2bcff-f872-4082-b87f-6125f2a68823'); // Replace with the ID you want to test

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 'd6e2bcff-f872-4082-b87f-6125f2a68823',
                name: 'name',
                email: "test@example.com",
                password: '123'
            }
        ]);
    });

    it('should return a 400 on database error', async () => {
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        const res = await request(app).get('/customer/d6e2bcff-f872-4082-b87f-6125f2a68823');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ "error": errorMessage });
    });
});
