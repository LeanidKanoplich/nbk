const prisma = require('../prisma');

// Получение всех пользователей
const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        created_at: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение пользователя по ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        created_at: true
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание пользователя
const createUser = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    const user = await prisma.users.create({
      data: {
        email,
        password_hash: password, // В реальном приложении нужно хешировать пароль
        username,
        role
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        created_at: true
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление пользователя
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, role } = req.body;
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { email, username, role },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        created_at: true
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление пользователя
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.users.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}; 