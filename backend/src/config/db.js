let PrismaClient;
try {
  PrismaClient = require('../../prisma/client').PrismaClient;
} catch (e) {
  try {
    PrismaClient = require('@prisma/client').PrismaClient;
  } catch (err) {
    PrismaClient = null;
  }
}
const config = require('./env');

let prisma;

if (PrismaClient) {
  try {
    prisma = new PrismaClient({
      log: config.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
  } catch (error) {
    console.warn('Prisma Client failed to initialize:', error.message);
    prisma = null;
  }
}

const checkDatabaseConnection = async () => {
  if (!prisma) {
    return { connected: false, message: 'Prisma Client not initialized' };
  }
  try {
    // Attempt a light query
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, message: 'Database connection successful' };
  } catch (error) {
    return { connected: false, message: error.message };
  }
};

module.exports = {
  prisma,
  checkDatabaseConnection
};

