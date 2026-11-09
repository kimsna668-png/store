const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const config = require('./config/env');
const { checkDatabaseConnection } = require('./config/db');

const app = express();

// Ensure upload & storage directories exist
if (!fs.existsSync(config.UPLOAD_DIR)) {
  fs.mkdirSync(config.UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(config.STORAGE_DIR)) {
  fs.mkdirSync(config.STORAGE_DIR, { recursive: true });
}

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  config.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in dev mode for flexibility
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiter for general API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after 15 minutes'
  }
});
app.use('/api', limiter);

// Raw body parser for webhooks (Stripe webhook verification requires raw buffer)
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    next();
  } else {
    express.json({ limit: '10mb' })(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads (public product images)
app.use('/uploads', express.static(config.UPLOAD_DIR));

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const telegramRoutes = require('./routes/telegramRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/telegram', telegramRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/admin/categories', categoryRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbStatus = await checkDatabaseConnection();
  res.json({
    status: 'ok',
    app: 'NavasealStore Clone Pro API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: config.NODE_ENV
  });
});

// Frontend Production Static Serving
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  console.log(`📦 Serving production frontend build from: ${frontendDistPath}`);
  app.use(express.static(frontendDistPath));

  // SPA fallback for frontend client-side routes (excluding /api routes)
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  // Root welcome endpoint fallback if frontend not built
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to NavasealStore Clone Pro Backend API',
      documentation: '/api/health',
      status: 'active'
    });
  });
}

// 404 handler for unmatched API routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error handler
app.use((err, req, res, next) => {
  console.error('[Error]:', err.stack || err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(config.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start Server if directly invoked
if (require.main === module) {
  const PORT = config.PORT;
  const server = app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 NavasealStore Clone Pro API running on port ${PORT}`);
    console.log(`📡 Health Check: https://store-cw7f.onrender.com/api/health`);
    console.log(`🌐 Frontend Origin: ${config.FRONTEND_URL}`);
    console.log(`===============================================`);
  });

  // Graceful shutdown
  const gracefulShutdown = () => {
    console.log('\nReceived shutdown signal, terminating server cleanly...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}

module.exports = app;

