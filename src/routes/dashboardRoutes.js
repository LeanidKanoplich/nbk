const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Базовый маршрут для проверки
router.get('/', (req, res) => {
  res.json({ message: 'Dashboard API is working' });
});

// Маршрут для получения статистики
router.get('/summary', dashboardController.getSummaryStats);

module.exports = router;