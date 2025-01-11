const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const prisma = require('./prisma/client');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const authRoutes = require('./routes/authRoutes');

// Конфигурация переменных окружения
dotenv.config();

// Константы приложения
const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = '/api/v1';
const CORS_OPTIONS = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Auth routes (должны быть перед защищенными маршрутами)
app.use(API_VERSION, authRoutes);

// Protected routes
app.use(API_VERSION, userRoutes);
app.use(API_VERSION, clientRoutes);
app.use(API_VERSION, warehouseRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
