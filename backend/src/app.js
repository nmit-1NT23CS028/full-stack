const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { authenticate } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');
const categoryRoutes = require('./routes/categories.routes');
const orderRoutes = require('./routes/orders.routes');
const supplierRoutes = require('./routes/suppliers.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const activityRoutes = require('./routes/activity.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/products', authenticate, productRoutes);
app.use('/api/categories', authenticate, categoryRoutes);
app.use('/api/orders', authenticate, orderRoutes);
app.use('/api/suppliers', authenticate, supplierRoutes);
app.use('/api/dashboard', authenticate, dashboardRoutes);
app.use('/api/activity-logs', authenticate, activityRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
