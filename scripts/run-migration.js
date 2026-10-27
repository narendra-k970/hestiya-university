const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
  console.log('🔄 Running database migrations...');
  try {
    // 1. Add company to User table
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "User" 
      ADD COLUMN IF NOT EXISTS "company" TEXT;
    `);
    console.log('✅ Added "company" column to "User" table.');

    // 2. Add columns to Certificate table
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Certificate" 
      ADD COLUMN IF NOT EXISTS "userId" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Certificate" 
      ADD COLUMN IF NOT EXISTS "fileUrl" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Certificate" 
      ADD COLUMN IF NOT EXISTS "score" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Certificate" 
      ADD COLUMN IF NOT EXISTS "status" TEXT DEFAULT 'Valid';
    `);
    console.log('✅ Added "userId", "fileUrl", "score", "status" columns to "Certificate" table.');

    // 3. Make enrolmentId nullable if needed
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Certificate" 
        ALTER COLUMN "enrolmentId" DROP NOT NULL;
      `);
      console.log('✅ Made "enrolmentId" nullable in "Certificate" table.');
    } catch (e) {
      console.log('ℹ️ enrolmentId alter note:', e.message);
    }

    // 4. Create Contact table if not exists
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Contact" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "company" TEXT,
        "course" TEXT,
        "message" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Created "Contact" table.');

    console.log('🎉 Database migrations completed successfully!');
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
