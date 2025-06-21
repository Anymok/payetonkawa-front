const request = require('supertest');
const express = require('express');
const { getAllProduct } = require('../src/controller/product_controller');
const { createDbConnection } = require('../database');

jest.mock('../database');
jest.mock('../src/model/product_model', () => ({
    getAllProduct: "SELECT * FROM product"
}));

const app = express();
app.get('/product', getAllProduct);

describe('GET /product', () => {
    let pool;

    beforeAll(() => {
        pool = { query: jest.fn() };
        createDbConnection.mockResolvedValue(pool);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a 200 with all products', async () => {
        const mockResults = {
            rows: [
                {
                    id: "d6e2bcff-f872-4082-b87f-6125f2a68823",
                    name: "café Arabica",
                    price: 20,
                    description: "desc test",
                    stock: 20,
                    category: "EGGEG",
                    brand: "kifejzofeij",
                    rating: 2,
                    characteristic:"characteristic test"
                }
            ]
        };

        pool.query.mockResolvedValue(mockResults);

        const res = await request(app).get('/product');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: "d6e2bcff-f872-4082-b87f-6125f2a68823",
                name: "café Arabica",
                price: 20,
                description: "desc test",
                stock: 20,
                category: "EGGEG",
                brand: "kifejzofeij",
                rating: 2,
                characteristic:"characteristic test"
            },
        ]);
    });

    it('should return a 400 on database error', async () => {
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        const res = await request(app).get('/product');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ "error": errorMessage });
    });
});
