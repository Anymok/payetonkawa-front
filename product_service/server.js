const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const healthCheckRoutes = require('./src/routes/healthcheck');
const productRoutes = require('./src/routes/product_router');

const isAppEngine = process.env.GAE_ENV === 'standard';
const environnement = isAppEngine ? "PRODUCTION" : "LOCAL"

const app = express();
const port = process.env.SERVICE_PORT || 8080;

app.set('trust proxy', true);

app.use(express.json());
app.use(cors());

app.use('/api/product/healthcheck', healthCheckRoutes);
app.use("/api/product/", productRoutes)

app.listen(port, () => {
    console.log(`[${environnement}] Server is listening on port ${port}`);
});