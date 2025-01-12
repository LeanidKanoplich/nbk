const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { checkAuth } = require('../middleware/authMiddleware');

// Получение всех клиентов
router.get('/', checkAuth, clientController.getAllClients);

// Создание клиента
router.post('/', checkAuth, clientController.createClient);

module.exports = router;