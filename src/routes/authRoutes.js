const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkAuth } = require('../middleware/authMiddleware');

// Регистрация
router.post('/register', authController.register);

// Логин
router.post('/login', authController.login);

// Проверка токена
router.get('/verify', checkAuth, authController.verifyToken);

module.exports = router; 