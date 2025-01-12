const prisma = require('../prisma');

// Получение списка банковских операций
const getBankOperations = async (req, res) => {
  try {
    const operations = await prisma.bankOperation.findMany({
      include: {
        account: true
      }
    });
    res.json(operations);
  } catch (error) {
    console.error('Error in getBankOperations:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получение операции по ID
const getBankOperationById = async (req, res) => {
  try {
    const { id } = req.params;
    const operation = await prisma.bankOperation.findUnique({
      where: { id: Number(id) },
      include: {
        account: true
      }
    });
    if (!operation) {
      return res.status(404).json({ error: 'Bank operation not found' });
    }
    res.json(operation);
  } catch (error) {
    console.error('Error in getBankOperationById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создание банковской операции
const createBankOperation = async (req, res) => {
  try {
    const { account_id, type, amount, description } = req.body;
    
    const operation = await prisma.bankOperation.create({
      data: {
        account: {
          connect: { id: Number(account_id) }
        },
        type,
        amount: Number(amount),
        description
      },
      include: {
        account: true
      }
    });
    
    res.status(201).json(operation);
  } catch (error) {
    console.error('Error in createBankOperation:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновление банковской операции
const updateBankOperation = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, description } = req.body;
    
    const operation = await prisma.bankOperation.update({
      where: { id: Number(id) },
      data: {
        type,
        amount: Number(amount),
        description
      },
      include: {
        account: true
      }
    });
    
    res.json(operation);
  } catch (error) {
    console.error('Error in updateBankOperation:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удаление банковской операции
const deleteBankOperation = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.bankOperation.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteBankOperation:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBankOperations,
  getBankOperationById,
  createBankOperation,
  updateBankOperation,
  deleteBankOperation
}; 