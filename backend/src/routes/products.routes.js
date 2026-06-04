const express = require('express');
const { body, param } = require('express-validator');
const db = require('../config/db');
const redis = require('../config/redis');
const validate = require('../middlewares/validate');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cacheKey = 'products:list';
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const [rows] = await db.query(
      `SELECT p.id, p.name, p.sku, p.barcode, p.stock_quantity, p.reorder_level, c.name AS category
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       ORDER BY p.created_at DESC`
    );

    await redis.set(cacheKey, JSON.stringify(rows), 'EX', 60);
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
});

router.post(
  '/',
  authorize('admin', 'manager'),
  [
    body('name').isLength({ min: 2 }),
    body('sku').isLength({ min: 3 }),
    body('stockQuantity').isInt({ min: 0 }),
    body('reorderLevel').isInt({ min: 0 }),
    body('categoryId').optional().isInt()
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, sku, barcode, stockQuantity, reorderLevel, categoryId } = req.body;
      await db.query(
        `INSERT INTO products (name, sku, barcode, stock_quantity, reorder_level, category_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, sku, barcode || null, stockQuantity, reorderLevel, categoryId || null]
      );
      await redis.del('products:list');
      res.status(201).json({ message: 'Product created' });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  authorize('admin', 'manager'),
  [param('id').isInt(), body('name').optional().isLength({ min: 2 }), body('stockQuantity').optional().isInt({ min: 0 })],
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, barcode, stockQuantity, reorderLevel, categoryId } = req.body;
      await db.query(
        `UPDATE products
         SET name = COALESCE(?, name),
             barcode = COALESCE(?, barcode),
             stock_quantity = COALESCE(?, stock_quantity),
             reorder_level = COALESCE(?, reorder_level),
             category_id = COALESCE(?, category_id)
         WHERE id = ?`,
        [name || null, barcode || null, stockQuantity ?? null, reorderLevel ?? null, categoryId ?? null, id]
      );
      await redis.del('products:list');
      res.json({ message: 'Product updated' });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', authorize('admin', 'manager'), [param('id').isInt()], validate, async (req, res, next) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    await redis.del('products:list');
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/adjust-stock', authorize('admin', 'manager', 'staff'), [param('id').isInt(), body('change').isInt()], validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { change, reason } = req.body;
    await db.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?', [change, id]);
    await db.query('INSERT INTO stock_adjustments (product_id, user_id, change_amount, reason) VALUES (?, ?, ?, ?)', [id, req.user.id, change, reason || null]);
    await redis.del('products:list');
    res.json({ message: 'Stock adjusted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
