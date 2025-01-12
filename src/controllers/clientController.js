const prisma = require('../prisma');

// Получение всех клиентов
const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.clients.findMany();
    res.json({ status: 'success', data: clients });
  } catch (error) {
    console.error('Error in getAllClients:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создание клиента
const createClient = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      type = 'INDIVIDUAL',
      clientType = 'BOTH',
      code,
      vat_code 
    } = req.body;
    
    const userId = req.user.id; // Получаем ID пользователя из токена

    const client = await prisma.clients.create({
      data: {
        name,
        email,
        phone,
        type,
        clientType,
        code,
        vat_code,
        is_active: true,
        user_id: userId
      }
    });
    res.status(201).json({ status: 'success', data: client });
  } catch (error) {
    console.error('Error in createClient:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получение клиента по ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.clients.findUnique({
      where: { id: parseInt(id) },
      include: {
        sales: true,
        purchases: true,
        warehouses: true,
        doc_settlements: true,
        bank_operations: true
      }
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ status: 'success', data: client });
  } catch (error) {
    console.error('Error in getClientById:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClients,
  createClient,
  getClientById
}; 