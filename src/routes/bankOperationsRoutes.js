const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');
const bankOperationsController = require('../controllers/bankOperationsController');

// Получение списка всех банковских операций
router.get('/', 
  checkAuth,
  checkPermission('VIEW_BANK_OPERATIONS'),
  bankOperationsController.getBankOperations
);

// Получение конкретной операции по ID
router.get('/:id', 
  checkAuth,
  checkPermission('VIEW_BANK_OPERATIONS'),
  bankOperationsController.getBankOperationById
);

// Создание новой банковской операции
router.post('/', 
  checkAuth,
  checkPermission('CREATE_BANK_OPERATIONS'),
  bankOperationsController.createBankOperation
);

// Обновление существующей операции
router.put('/:id', 
  checkAuth,
  checkPermission('UPDATE_BANK_OPERATIONS'),
  bankOperationsController.updateBankOperation
);

// Удаление операции
router.delete('/:id', 
  checkAuth,
  checkPermission('DELETE_BANK_OPERATIONS'),
  bankOperationsController.deleteBankOperation
);

module.exports = router; 