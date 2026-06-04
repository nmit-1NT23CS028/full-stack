const express = require('express');
const { body } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, phone FROM suppliers ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize('admin', 'manager'), [body('name').isLength({ min: 2 })], validate, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    await db.query('INSERT INTO suppliers (name, email, phone) VALUES (?, ?, ?)', [name, email || null, phone || null]);
    res.status(201).json({ message: 'Supplier created' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
