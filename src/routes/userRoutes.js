const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Базовые маршруты пользователей
router.get('/', 
  checkAuth,
  userController.getUsers
);

router.get('/:id', 
  checkAuth,
  userController.getUserById
);

router.post('/', 
  checkAuth,
  userController.createUser
);

router.put('/:id', 
  checkAuth,
  userController.updateUser
);

router.delete('/:id', 
  checkAuth,
  userController.deleteUser
);

module.exports = router; 