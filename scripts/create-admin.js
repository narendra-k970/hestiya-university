const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.argv[2] || 'admin@hestiya.com';
  const password = process.argv[3] || 'Admin@123';
  const name = process.argv[4] || 'Admin User';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        role: 'ADMIN',
        password: hashedPassword,
        name: name,
      },
      create: {
        name: name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin user created/updated successfully:');
    console.log(`   Email:    ${user.email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role:     ${user.role}`);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
