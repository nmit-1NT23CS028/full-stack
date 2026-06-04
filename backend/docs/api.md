# Smart Inventory API Documentation

## Base URL
`/api`

## Authentication
- `POST /auth/login` → returns JWT token

## Protected Endpoints
- Users: `GET/POST/PUT/DELETE /users`
- Products: `GET/POST/PUT/DELETE /products`, `POST /products/:id/adjust-stock`
- Categories: `GET/POST /categories`
- Orders: `GET/POST /orders`, `PUT /orders/:id/status`
- Suppliers: `GET/POST /suppliers`
- Dashboard: `GET /dashboard/overview`
- Activity Logs: `GET /activity-logs`

## Roles
- `admin`: full access
- `manager`: operational access
- `staff`: restricted transactional access
