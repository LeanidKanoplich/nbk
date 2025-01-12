const prisma = require('../prisma');

// Получение списка складов
const getWarehouses = async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        capacity: true,
        created_at: true,
        updated_at: true
      }
    });
    res.json(warehouses);
  } catch (error) {
    console.error('Error in getWarehouses:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получение склада по ID
const getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await prisma.warehouse.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        address: true,
        capacity: true,
        created_at: true,
        updated_at: true
      }
    });
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    res.json(warehouse);
  } catch (error) {
    console.error('Error in getWarehouseById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создание склада
const createWarehouse = async (req, res) => {
  try {
    const { name, address, capacity } = req.body;
    const warehouse = await prisma.warehouse.create({
      data: {
        name,
        address,
        capacity: Number(capacity)
      }
    });
    res.status(201).json(warehouse);
  } catch (error) {
    console.error('Error in createWarehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновление склада
const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, capacity } = req.body;
    const warehouse = await prisma.warehouse.update({
      where: { id: Number(id) },
      data: {
        name,
        address,
        capacity: Number(capacity)
      }
    });
    res.json(warehouse);
  } catch (error) {
    console.error('Error in updateWarehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удаление склада
const deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.warehouse.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteWarehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
}; 