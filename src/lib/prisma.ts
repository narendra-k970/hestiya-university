import { PrismaClient } from '@prisma/client';

// Next.js hot-reloading me baar-baar new PrismaClient() create na ho,
// isliye global singleton pattern use karte hain:
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
