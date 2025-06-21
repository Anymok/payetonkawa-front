const { Router } = require('express')
const pool = require('../../database')

const router = Router()

router.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    res.status(200).json({ message: 'La connexion à la base de données est réussie.' });
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    res.status(500).json({ message: 'Erreur de connexion à la base de données.' });
  }
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'API en ligne.' });
});

module.exports = router