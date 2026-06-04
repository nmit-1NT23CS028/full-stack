INSERT INTO users (name, email, password_hash, role)
VALUES
  ('Admin User', 'admin@inventory.com', '$2b$10$Yl4gqV3E11VJ2ORf0Qv5QeMYj5NbJQhGa2M6Q9VjQ2Bq8VtQcx4lK', 'admin'),
  ('Manager User', 'manager@inventory.com', '$2b$10$Yl4gqV3E11VJ2ORf0Qv5QeMYj5NbJQhGa2M6Q9VjQ2Bq8VtQcx4lK', 'manager'),
  ('Staff User', 'staff@inventory.com', '$2b$10$Yl4gqV3E11VJ2ORf0Qv5QeMYj5NbJQhGa2M6Q9VjQ2Bq8VtQcx4lK', 'staff');

INSERT INTO categories (name) VALUES ('Electronics'), ('Groceries'), ('Furniture');

INSERT INTO products (name, sku, barcode, stock_quantity, reorder_level, category_id)
VALUES
  ('Laptop', 'SKU-LAP-001', '8901234567890', 12, 5, 1),
  ('Office Chair', 'SKU-CHR-002', '8901234567891', 3, 5, 3),
  ('Rice Bag', 'SKU-RIC-003', '8901234567892', 20, 8, 2);

INSERT INTO suppliers (name, email, phone)
VALUES ('Acme Supplier', 'contact@acme.com', '+1-555-1234');

INSERT INTO orders (type, status, supplier_id, total_amount, created_by)
VALUES
  ('purchase', 'processing', 1, 1200.00, 1),
  ('sales', 'completed', NULL, 850.00, 2);

INSERT INTO activity_logs (user_id, action, metadata)
VALUES
  (1, 'LOGIN', JSON_OBJECT('source', 'web')),
  (2, 'CREATE_ORDER', JSON_OBJECT('orderType', 'sales'));
