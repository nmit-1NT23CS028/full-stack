const express = require('express');
const { body } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, name FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize('admin', 'manager'), [body('name').isLength({ min: 2 })], validate, async (req, res, next) => {
  try {
    await db.query('INSERT INTO categories (name) VALUES (?)', [req.body.name]);
    res.status(201).json({ message: 'Category created' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
