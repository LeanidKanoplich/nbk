require('dotenv').config();
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');
const { JWT_SECRET } = process.env;

// Проверка аутентификации
const checkAuth = (req, res, next) => {
  try {
    // Получаем заголовок авторизации
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader); // Добавляем лог

    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Проверяем формат Bearer token
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Token error' });
    }

    const token = parts[1];
    console.log('Token received:', token.substring(0, 20) + '...'); // Логируем часть токена

    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Добавляем лог

    // Добавляем информацию о пользователе в запрос
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Проверка прав доступа
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
};

module.exports = {
  checkAuth,
  checkPermission
}; 