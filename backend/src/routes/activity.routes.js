const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, user_id, action, metadata, created_at FROM activity_logs ORDER BY created_at DESC LIMIT 100');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
