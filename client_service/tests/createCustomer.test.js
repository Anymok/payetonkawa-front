const request = require('supertest');
const express = require('express');
const { createCustomer } = require('../src/controller/customer_controller');
const pool = require('../database');
const {createDbConnection} = require("../database");

jest.mock('../database');
jest.mock('../src/model/customer_model', () => ({
    createCustomer: "INSERT INTO customers (id, name, email, password) VALUES ($1, $2, $3, '5454')"
}));

const app = express();
app.use(express.json());
// Middleware pour extraire le token
app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        req.tokenData = { sid: 'mock-sid', name: 'mock-name', preferred_username: 'mock-username' }; // Mock token data
    }
    next();
});
app.post('/customer', createCustomer);

describe('POST /customer', () => {
    let pool;

    beforeAll(() => {
        pool = { query: jest.fn() };
        createDbConnection.mockResolvedValue(pool);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create an customer successfully', async () => {
        const mockCustomer =
            {
                id: 'd6e2bcff-f872-4082-b87f-6125f2a68823',
                name: 'name',
                email: "test@example.com",
                password: '123'
            };

        pool.query.mockResolvedValueOnce(mockCustomer);

        const res = await request(app)
            .post('/customer')
            .set('Authorization', 'Bearer mock-token')
            .send(mockCustomer);

        expect(res.status).toBe(201);
    });

    it('should return a 500 on database error', async () => {
        const mockCustomer =
            {
                id: 'd6e2bcff-f872-4082-b87f-6125f2a68823',
                name: 'name',
                email: "test@example.com",
                password: '5454'
            };

        // Mock de l'erreur de la requête de création de customer
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        const res = await request(app)
            .post('/customer')
            .set('Authorization', 'Bearer mock-token')
            .send(mockCustomer);

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ "error": "Database error" });
    });

});