const express = require('express');
const { body } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize('admin', 'manager', 'staff'), [body('type').isIn(['purchase', 'sales']), body('status').isIn(['pending', 'processing', 'completed', 'cancelled'])], validate, async (req, res, next) => {
  try {
    const { type, status, supplierId, totalAmount } = req.body;
    await db.query('INSERT INTO orders (type, status, supplier_id, total_amount, created_by) VALUES (?, ?, ?, ?, ?)', [type, status, supplierId || null, totalAmount || 0, req.user.id]);
    res.status(201).json({ message: 'Order created' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/status', authorize('admin', 'manager'), [body('status').isIn(['pending', 'processing', 'completed', 'cancelled'])], validate, async (req, res, next) => {
  try {
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
    res.json({ message: 'Order status updated' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
