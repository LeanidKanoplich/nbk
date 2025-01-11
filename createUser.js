const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createUser() {
  try {
    const newUser = await prisma.users.create({
      data: {
        email: 'solar@solar.pl',  // Укажите нужный email
        password_hash: '$2a$10$z5INGYgN93KDazkwiehYZeKecxHlvz3qCXzTfXNA81W5Ij./mIEdC',
        username: 'solar',           // Укажите нужное имя пользователя
        role: 'admin'
      }
    })
    
    console.log('Создан новый пользователь:', newUser)
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createUser()