const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkUsers() {
  try {
    const users = await prisma.users.findMany()
    console.log('Существующие пользователи:', users)
  } catch (error) {
    console.error('Ошибка при проверке пользователей:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()