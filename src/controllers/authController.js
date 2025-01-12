const prisma = require('../prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Регистрация нового пользователя
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Проверяем, существует ли пользователь
    const existingUser = await prisma.users.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const user = await prisma.users.create({
      data: {
        email,
        password_hash: hashedPassword,
        username,
        role: 'user'
      }
    });

    // Создаем токен
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Логин пользователя
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Ищем пользователя
    const user = await prisma.users.findUnique({
      where: { email }
    });

    console.log('Found user:', user);

    if (!user) {
      return res.status(401).json({ 
        status: 'error',
        error: 'Invalid credentials' 
      });
    }

    // Проверяем, используем ли мы правильное поле для пароля
    const passwordField = user.password || user.password_hash;
    console.log('Password field:', passwordField);

    // Проверяем пароль
    const isValidPassword = await bcrypt.compare(password, passwordField);
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ 
        status: 'error',
        error: 'Invalid credentials' 
      });
    }

    // Создаем токен
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Обновляем время последнего входа
    await prisma.users.update({
      where: { id: user.id },
      data: { last_login: new Date() }
    });

    res.json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ 
      status: 'error',
      error: error.message 
    });
  }
};

// Проверка токена
const verifyToken = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        is_active: true
      }
    });

    if (!user || !user.is_active) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({
      status: 'success',
      data: {
        user,
        token: req.headers.authorization.split(' ')[1]
      }
    });
  } catch (error) {
    console.error('Error in verifyToken:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyToken
}; 