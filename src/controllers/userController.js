const prisma = require('../prisma/client');

const userController = {
  // Базовые методы контроллера
  getUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController; 