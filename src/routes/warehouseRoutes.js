const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/warehouses', authMiddleware, warehouseController.getWarehouses);
router.post('/warehouses', authMiddleware, warehouseController.createWarehouse);

module.exports = router; 