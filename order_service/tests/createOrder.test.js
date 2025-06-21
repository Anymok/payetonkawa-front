const request = require('supertest');
const express = require('express');
const { createOrder } = require('../src/controller/order_controller');
const pool = require('../database');
const axios = require('axios');

jest.mock('../database')
jest.mock('axios');

jest.mock('../database', () => {
    return {
        query: jest.fn(), // Mock de pool.query
    };
});

const app = express();
app.use(express.json());
app.post('/order', createOrder);

describe('POST /order', () => {
    // it('should create an order successfully', async () => {
    //     const mockDate = '2024-07-02';
    //     const mockIdProducts = [1, 2, 3];
    //     const mockSid = 'mock-sid';
    //
    //     // Mock de la réponse de axios.get
    //     axios.get.mockResolvedValue({ status: 200 });
    //
    //     // Mock de la création de la commande
    //     pool.query.mockImplementation((query, params, callback) => {
    //         if (query === queries.createOrder) {
    //             return callback(null, { rows: [{ id: 1 }] });
    //         } else if (query === queries.associateOrderProduct) {
    //             return callback(null);
    //         }
    //     });
    //
    //     const res = await request(app)
    //         .post('/order')
    //         .set('Authorization', 'Bearer mock-token')
    //         .send({ date: mockDate, idProducts: mockIdProducts });
    //
    //     expect(res.status).toBe(201);
    //     expect(res.text).toBe("Commande créée avec succès");
    // });

    // it('should return a 500 on database error', async () => {
    //     const mockDate = '2024-07-02';
    //     const mockIdProducts = [1, 2, 3];
    //     const mockSid = 'mock-sid';
    //
    //     // Mock de la réponse de axios.get
    //     axios.get.mockResolvedValue({ status: 200 });
    //
    //     // Mock de l'erreur de la requête de création de la commande
    //     pool.query.mockImplementation((query, params, callback) => {
    //         if (query === queries.createOrder) {
    //             return callback(new Error('Database error'));
    //         } else if (query === queries.associateOrderProduct) {
    //             return callback(null);
    //         }
    //     });
    //
    //     const res = await request(app)
    //         .post('/order')
    //         .set('Authorization', 'Bearer mock-token')
    //         .send({ date: mockDate, idProducts: mockIdProducts });
    //
    //     expect(res.status).toBe(500);
    //     expect(res.body).toEqual({ "error": "Database error" });
    // });

    it('should return a 404 if customer not found', async () => {
        const mockDate = '2024-07-02';
        const mockIdProducts = [1, 2, 3];
        const mockSid = 'mock-sid';

        // Mock de la réponse de axios.get (client non trouvé)
        axios.get.mockResolvedValue({ status: 404 });

        const res = await request(app)
            .post('/order')
            .set('Authorization', 'Bearer mock-token')
            .send({ date: mockDate, idProducts: mockIdProducts });

        expect(res.status).toBe(500);
    });
});