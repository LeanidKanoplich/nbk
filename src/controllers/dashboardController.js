const prisma = require('../prisma');

const getSummaryStats = async (req, res) => {
  try {
    // Проверяем подключение
    await prisma.$connect();

    // Получаем базовую статистику
    const stats = await prisma.$transaction([
      prisma.clients.count(),
      prisma.products.count()
    ]);

    res.json({
      status: 'success',
      data: {
        clients: stats[0],
        products: stats[1]
      }
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getSummaryStats
};