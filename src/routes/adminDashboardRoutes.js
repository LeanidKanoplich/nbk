const express = require('express');
const router = express.Router();
const path = require('path');
const authenticateToken = require('../middleware/auth');
const { checkAdmin } = require('../middleware/adminMiddleware');

// Логирование запросов
router.use((req, res, next) => {
    console.log('Admin Dashboard Request:', req.method, req.path);
    next();
});

// Публичные маршруты
router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../public/admin/login.html');
    console.log('Serving login file from:', filePath);
    res.sendFile(filePath);
});

// Защищенные маршруты (требуют аутентификации)
router.get('/dashboard', authenticateToken, checkAdmin, (req, res) => {
    const filePath = path.join(__dirname, '../public/admin/dashboard.html');
    console.log('Serving dashboard file from:', filePath);
    res.sendFile(filePath);
});

// Остальные защищенные маршруты
router.get('/clients', authenticateToken, checkAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/clients.html'));
});

router.get('/products', authenticateToken, checkAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/products.html'));
});

router.get('/warehouses', authenticateToken, checkAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/warehouses.html'));
});

router.get('/accounts', authenticateToken, checkAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/accounts.html'));
});

router.get('/settings', authenticateToken, checkAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/settings.html'));
});

// Редирект с корневого пути
router.get('/', (req, res) => {
    res.redirect('/admin/login');
});

module.exports = router; 