const prisma = require('../prisma');

// Получение всех продуктов
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.json({ status: 'success', data: products });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создание продукта
const createProduct = async (req, res) => {
  try {
    const { code, name, description, unit, price, currency } = req.body;
    const userId = req.user.id;

    const product = await prisma.products.create({
      data: {
        code,
        name,
        description,
        unit,
        price: new Decimal(price),
        currency,
        user_id: userId,
        is_active: true
      }
    });
    res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получение продукта по ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновление продукта
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, description, unit, price, currency, is_active } = req.body;
    const product = await prisma.products.update({
      where: { id: parseInt(id) },
      data: {
        code,
        name,
        description,
        unit,
        price: price ? new Decimal(price) : undefined,
        currency,
        is_active
      }
    });
    res.json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удаление продукта
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.products.delete({
      where: { id: parseInt(id) }
    });
    res.json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
}; 