const express = require('express');
const { body, param } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authorize('admin', 'manager'), async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authorize('admin'),
  [
    body('name').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('role').isIn(['admin', 'manager', 'staff'])
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const hash = await bcrypt.hash(password, 10);
      await db.query('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [name, email, hash, role]);
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  authorize('admin'),
  [param('id').isInt(), body('name').optional().isLength({ min: 2 }), body('role').optional().isIn(['admin', 'manager', 'staff'])],
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, role } = req.body;
      await db.query('UPDATE users SET name = COALESCE(?, name), role = COALESCE(?, role) WHERE id = ?', [name || null, role || null, id]);
      res.json({ message: 'User updated' });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', authorize('admin'), [param('id').isInt()], validate, async (req, res, next) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
