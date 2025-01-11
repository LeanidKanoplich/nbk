const prisma = require('../prisma/client');

const warehouseController = {
  getWarehouses: async (req, res) => {
    try {
      const warehouses = await prisma.warehouses.findMany({
        where: { user_id: req.user.id }
      });
      res.json(warehouses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createWarehouse: async (req, res) => {
    try {
      const warehouse = await prisma.warehouses.create({
        data: {
          ...req.body,
          user_id: req.user.id
        }
      });
      res.status(201).json(warehouse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = warehouseController; 