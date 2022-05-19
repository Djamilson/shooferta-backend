import { PrismaClient as PrismaClientMongoDb } from '../../../../../prisma/generated/mongodb';
import { PrismaClient as PrismaClientPostgres } from '../../../../../prisma/generated/postgres';

const postgres = new PrismaClientPostgres({
  log: ['query', 'info'],
});

const mongodb = new PrismaClientMongoDb({
  log: ['query', 'info'],
});

export { postgres, mongodb };
