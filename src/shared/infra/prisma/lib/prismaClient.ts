import { PrismaClient as PrismaClientPostgres } from '../postgres/generated/postgres';
import { PrismaClient as PrismaClientMongoDb } from '../mongodb/generated/mongodb';

const postgres = new PrismaClientPostgres({
  log: ['query', 'info'],
});

const mongodb = new PrismaClientMongoDb({
  log: ['query', 'info'],
});

export { postgres, mongodb };
