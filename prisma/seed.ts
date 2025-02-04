import { PrismaClient } from '@prisma/client';
import { WinstonLogger } from '../src/core/infrastructure/logger/winston.logger';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const logger = new WinstonLogger();

async function sedding() {
    logger.info(undefined, '🌱 Seeding database...');

  // 🔹 Crear usuarios con contraseñas hasheadas
  const passwordHash = await bcrypt.hash('mypassword123', 10);
  
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'adminUser',
      email: 'admin@example.com',
      password: passwordHash,
      role: 1, // Admin
      address: '123 Admin St.',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      username: 'regularUser',
      email: 'user@example.com',
      password: passwordHash,
      role: 2, // Regular User
      address: '456 User St.',
    },
  });

  console.log(`✅ Created Users: ${user1.email}, ${user2.email}`);

  // 🔹 Crear productos
  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop Gaming',
      description: 'Laptop potente para gaming y desarrollo',
      price: 1500.99,
      stock: 10,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Mouse Inalambrico',
      description: 'Mouse ergonómico con conexión Bluetooth',
      price: 39.99,
      stock: 50,
    },
  });

  console.log(`Created Products: ${product1.name}, ${product2.name}`);
  logger.info(undefined, `Created Products: ${product1.name}, ${product2.name}`);

  //Crear una orden para el usuario 2
  const order = await prisma.order.create({
    data: {
      user_id: user2.id,
      total_price: product1.price * 1 + product2.price * 2, // Calculamos total
      order_type: 'delivery',
      order_state: 'PENDIENTE',
      ProductOrder: {
        create: [
          { product_id: product1.id, quantity: 1 },
          { product_id: product2.id, quantity: 2 },
        ],
      },
    },
  });

  console.log(`Created Order ID: ${order.id}`);

  logger.info(undefined, `Created Order ID: ${order.id}`);

  console.log('Seeding complete!');
  logger.info(undefined, '🌱 Seeding complete!');
}

sedding()
  .catch((error) => {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
