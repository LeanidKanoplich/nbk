const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');
const purchaseController = require('../controllers/purchaseController');

// Получение списка всех закупок
router.get('/', 
  checkAuth,
  checkPermission('VIEW_PURCHASES'),
  purchaseController.getPurchases
);

// Получение конкретной закупки по ID
router.get('/:id', 
  checkAuth,
  checkPermission('VIEW_PURCHASES'),
  purchaseController.getPurchaseById
);

// Создание новой закупки
router.post('/', 
  checkAuth,
  checkPermission('CREATE_PURCHASES'),
  purchaseController.createPurchase
);

// Обновление существующей закупки
router.put('/:id', 
  checkAuth,
  checkPermission('UPDATE_PURCHASES'),
  purchaseController.updatePurchase
);

// Удаление закупки
router.delete('/:id', 
  checkAuth,
  checkPermission('DELETE_PURCHASES'),
  purchaseController.deletePurchase
);

module.exports = router; 