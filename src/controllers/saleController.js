const prisma = require('../prisma');

// Получение списка продаж
const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        client: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    res.json(sales);
  } catch (error) {
    console.error('Error in getSales:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получение продажи по ID
const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await prisma.sale.findUnique({
      where: { id: Number(id) },
      include: {
        client: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    console.error('Error in getSaleById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создание продажи
const createSale = async (req, res) => {
  try {
    const { client_id, products, total_amount } = req.body;
    
    const sale = await prisma.sale.create({
      data: {
        client: {
          connect: { id: Number(client_id) }
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
        client: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.status(201).json(sale);
  } catch (error) {
    console.error('Error in createSale:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновление продажи
const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { total_amount } = req.body;
    
    const sale = await prisma.sale.update({
      where: { id: Number(id) },
      data: {
        total_amount: Number(total_amount)
      },
      include: {
        client: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.json(sale);
  } catch (error) {
    console.error('Error in updateSale:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удаление продажи
const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sale.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteSale:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
}; 