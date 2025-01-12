const prisma = require('../prisma');

// Получение списка закупок
const getPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        supplier: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    res.json(purchases);
  } catch (error) {
    console.error('Error in getPurchases:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получение закупки по ID
const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await prisma.purchase.findUnique({
      where: { id: Number(id) },
      include: {
        supplier: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    res.json(purchase);
  } catch (error) {
    console.error('Error in getPurchaseById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создание закупки
const createPurchase = async (req, res) => {
  try {
    const { supplier_id, products, total_amount } = req.body;
    
    const purchase = await prisma.purchase.create({
      data: {
        supplier: {
          connect: { id: Number(supplier_id) }
        },
        total_amount: Number(total_amount),
        products: {
          create: products.map(p => ({
            product: {
              connect: { id: Number(p.product_id) }
            },
            quantity: Number(p.quantity),
            price: Number(p.price)
          }))
        }
      },
      include: {
        supplier: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.status(201).json(purchase);
  } catch (error) {
    console.error('Error in createPurchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновление закупки
const updatePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const { total_amount } = req.body;
    
    const purchase = await prisma.purchase.update({
      where: { id: Number(id) },
      data: {
        total_amount: Number(total_amount)
      },
      include: {
        supplier: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.json(purchase);
  } catch (error) {
    console.error('Error in updatePurchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удаление закупки
const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.purchase.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error in deletePurchase:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase
}; 