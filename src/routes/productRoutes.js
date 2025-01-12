const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkAuth } = require('../middleware/authMiddleware');

// Получение всех продуктов
router.get('/', checkAuth, productController.getAllProducts);

// Создание продукта
router.post('/', checkAuth, productController.createProduct);

// Получение продукта по ID
router.get('/:id', checkAuth, productController.getProductById);

// Обновление продукта
router.put('/:id', checkAuth, productController.updateProduct);

// Удаление продукта
router.delete('/:id', checkAuth, productController.deleteProduct);

module.exports = router; 