const express = require('express');
const router = express.Router();
const chartOfAccountsController = require('../controllers/chartOfAccountsController');
const { checkAuth } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');

// Получение всех счетов
router.get('/', 
  checkAuth, 
  checkPermission('VIEW_CHART_OF_ACCOUNTS'), 
  chartOfAccountsController.getChartOfAccounts
);

// Создание счета
router.post('/', 
  checkAuth, 
  checkPermission('MANAGE_CHART_OF_ACCOUNTS'), 
  chartOfAccountsController.createAccount
);

// Получение счета по ID
router.get('/:id', 
  checkAuth, 
  checkPermission('VIEW_CHART_OF_ACCOUNTS'), 
  chartOfAccountsController.getAccountById
);

module.exports = router;