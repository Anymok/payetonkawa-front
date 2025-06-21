const { getSecret } = require('./src/middlewares/secrets');
const { Pool } = require('pg');
const dotenv = require('dotenv');

const isAppEngine = process.env.GAE_ENV === 'standard';
dotenv.config();

let pool;

async function createDbConnection() {
  if (pool) {
    return pool;
  }

  let dbConfig;

  if (!isAppEngine) {
    dbConfig = {
      user: process.env.POSTGRESQL_ADDON_USER,
      host: process.env.POSTGRESQL_ADDON_HOST,
      database: process.env.POSTGRESQL_ADDON_DB,
      password: process.env.POSTGRESQL_ADDON_PASSWORD,
      port: parseInt(process.env.POSTGRESQL_ADDON_PORT, 10),
    };
  } else {
    const secretJson = await getSecret();
    const secretConfig = JSON.parse(secretJson);
    dbConfig = {
      user: secretConfig.POSTGRESQL_ADDON_USER,
      host: secretConfig.POSTGRESQL_ADDON_HOST,
      database: secretConfig.POSTGRESQL_ADDON_DB,
      password: secretConfig.POSTGRESQL_ADDON_PASSWORD,
      port: parseInt(secretConfig.POSTGRESQL_ADDON_PORT, 10),
      host: "/cloudsql/forward-garden-421314:europe-west1:ravea-db"
    };
  }

  pool = new Pool(dbConfig);
  return pool;
}

module.exports = {
  createDbConnection,
};