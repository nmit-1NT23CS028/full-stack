const express = require('express');
const db = require('../config/db');
const redis = require('../config/redis');

const router = express.Router();

router.get('/overview', async (req, res, next) => {
  try {
    const cacheKey = 'dashboard:overview';
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const [[{ totalProducts }]] = await db.query('SELECT COUNT(*) AS totalProducts FROM products');
    const [[{ lowStock }]] = await db.query('SELECT COUNT(*) AS lowStock FROM products WHERE stock_quantity <= reorder_level');
    const [[{ totalOrders }]] = await db.query('SELECT COUNT(*) AS totalOrders FROM orders');
    const [recentTransactions] = await db.query('SELECT id, type, status, total_amount, created_at FROM orders ORDER BY created_at DESC LIMIT 10');
    const [userActivity] = await db.query('SELECT user_id, action, created_at FROM activity_logs ORDER BY created_at DESC LIMIT 10');

    const payload = { totalProducts, lowStock, totalOrders, recentTransactions, userActivity };
    await redis.set(cacheKey, JSON.stringify(payload), 'EX', 30);

    return res.json(payload);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
