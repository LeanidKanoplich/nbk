const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');
const saleController = require('../controllers/saleController');

// Получение списка всех продаж
router.get('/', 
  checkAuth,
  checkPermission('VIEW_SALES'),
  saleController.getSales
);

// Получение конкретной продажи по ID
router.get('/:id', 
  checkAuth,
  checkPermission('VIEW_SALES'),
  saleController.getSaleById
);

// Создание новой продажи
router.post('/', 
  checkAuth,
  checkPermission('CREATE_SALES'),
  saleController.createSale
);

// Обновление существующей продажи
router.put('/:id', 
  checkAuth,
  checkPermission('UPDATE_SALES'),
  saleController.updateSale
);

// Удаление продажи
router.delete('/:id', 
  checkAuth,
  checkPermission('DELETE_SALES'),
  saleController.deleteSale
);

module.exports = router; 