const prisma = require('../prisma');

// Получение всех счетов
const getChartOfAccounts = async (req, res) => {
  try {
    const accounts = await prisma.chart_of_accounts.findMany({
      orderBy: {
        code: 'asc'
      }
    });
    res.json({ status: 'success', data: accounts });
  } catch (error) {
    console.error('Error in getChartOfAccounts:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создание счета
const createAccount = async (req, res) => {
  try {
    const { 
      code, 
      name, 
      type,
      account_type,
      parent_code
    } = req.body;
    
    const userId = req.user.id;

    const account = await prisma.chart_of_accounts.create({
      data: {
        code,
        name,
        type,
        account_type,
        parent_code,
        is_active: true,
        user_id: userId
      }
    });
    res.status(201).json({ status: 'success', data: account });
  } catch (error) {
    console.error('Error in createAccount:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получение счета по ID
const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.chart_of_accounts.findUnique({
      where: { id: parseInt(id) }
    });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json({ status: 'success', data: account });
  } catch (error) {
    console.error('Error in getAccountById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновление счета
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      code, 
      name, 
      type,
      account_type,
      parent_code,
      is_active 
    } = req.body;

    const account = await prisma.chart_of_accounts.update({
      where: { id: parseInt(id) },
      data: {
        code,
        name,
        type,
        account_type,
        parent_code,
        is_active
      }
    });
    res.json({ status: 'success', data: account });
  } catch (error) {
    console.error('Error in updateAccount:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getChartOfAccounts,
  createAccount,
  getAccountById,
  updateAccount
}; 