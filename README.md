# Smart Inventory Management System

Production-ready full-stack inventory management platform using **React/Next.js + Node/Express + MySQL + Redis + Docker + JWT + RBAC**.

## Features
- JWT Authentication with bcrypt password hashing
- Role-based access control (`admin`, `manager`, `staff`)
- Inventory overview and low-stock alerts
- Product/category/SKU/barcode management
- Stock adjustment history
- Purchase and sales order management with status tracking
- Supplier management
- User management and activity logs
- Redis caching for product list and dashboard analytics
- Dockerized frontend/backend/mysql/redis
- CI workflow with GitHub Actions

## Project Structure
- `/frontend` → Next.js dashboard UI
- `/backend` → Express REST API
- `/backend/db/schema.sql` → relational schema
- `/backend/db/seed.sql` → sample seed data
- `/backend/docs/api.md` → API documentation
- `/docker-compose.yml` → local orchestration

## Quick Start (Docker)
```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MySQL: `localhost:3306`
- Redis: `localhost:6379`

## Default Test Accounts
> Password hash in seed data corresponds to seeded password managed via bcrypt.
- admin@inventory.com (admin)
- manager@inventory.com (manager)
- staff@inventory.com (staff)

## Local Setup (without Docker)
```bash
npm run backend:install
npm run frontend:install
npm run backend:start
```
Run frontend separately:
```bash
npm run frontend:dev
```

## Core API Endpoints
- `POST /api/auth/login`
- `GET/POST/PUT/DELETE /api/users`
- `GET/POST/PUT/DELETE /api/products`
- `POST /api/products/:id/adjust-stock`
- `GET/POST /api/categories`
- `GET/POST /api/orders`
- `PUT /api/orders/:id/status`
- `GET/POST /api/suppliers`
- `GET /api/dashboard/overview`
- `GET /api/activity-logs`

## Notes
- Keep production secrets in environment variables (do not hardcode).
- For submission zip, archive repository root after pull/clone: `zip -r smart-inventory.zip .`
