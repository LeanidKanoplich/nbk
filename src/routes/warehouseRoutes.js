const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');
const warehouseController = require('../controllers/warehouseController');

// Получение списка всех складов
router.get('/', 
  checkAuth,
  checkPermission('VIEW_WAREHOUSES'),
  warehouseController.getWarehouses
);

// Получение конкретного склада по ID
router.get('/:id', 
  checkAuth,
  checkPermission('VIEW_WAREHOUSES'),
  warehouseController.getWarehouseById
);

// Создание нового склада
router.post('/', 
  checkAuth,
  checkPermission('CREATE_WAREHOUSES'),
  warehouseController.createWarehouse
);

// Обновление существующего склада
router.put('/:id', 
  checkAuth,
  checkPermission('UPDATE_WAREHOUSES'),
  warehouseController.updateWarehouse
);

// Удаление склада
router.delete('/:id', 
  checkAuth,
  checkPermission('DELETE_WAREHOUSES'),
  warehouseController.deleteWarehouse
);

module.exports = router; 