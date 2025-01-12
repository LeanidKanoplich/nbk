const express = require('express');
const router = express.Router();
const path = require('path');
const { checkAuth } = require('../middleware/authMiddleware');

// Публичные маршруты
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/login.html'));
});

// Защищенные маршруты (требуют аутентификации)
router.get('/dashboard', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/dashboard.html'));
});

// Добавим редирект с корневого пути на логин
router.get('/', (req, res) => {
    res.redirect('/admin/login');
});

module.exports = router; 