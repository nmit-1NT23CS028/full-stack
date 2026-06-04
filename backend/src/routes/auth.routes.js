const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const db = require('../config/db');
const env = require('../config/env');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const [rows] = await db.query('SELECT id, name, email, role, password_hash FROM users WHERE email = ?', [email]);
      const user = rows[0];

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwtSecret, {
        expiresIn: env.jwtExpiresIn
      });

      return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
