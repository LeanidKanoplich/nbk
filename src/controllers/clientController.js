const prisma = require('../prisma/client');

const clientController = {
  getClients: async (req, res) => {
    try {
      const clients = await prisma.clients.findMany({
        where: { user_id: req.user.id }
      });
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createClient: async (req, res) => {
    try {
      const client = await prisma.clients.create({
        data: {
          ...req.body,
          user_id: req.user.id
        }
      });
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = clientController; 