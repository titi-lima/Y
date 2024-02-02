import { PrismaClient } from '@prisma/client';

class DatabaseConnection {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(): Promise<void> {
    try {
      await this.prisma.$connect();
    } catch (error) {
      throw new Error(
        `Error: could not connect to test database! Make sure you are running the back-end. ${error}`,
      );
    }
  }

  async close() {
    await this.prisma.$disconnect();
  }

  async clear() {
    const tables = (await this.prisma.$queryRaw`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_prisma_%';
    `) as { name: string }[];

    await Promise.all(
      tables.map(async (table) => {
        await this.prisma.$executeRawUnsafe(`DELETE FROM "${table.name}"`);
      }),
    );
  }

  async get() {
    return this.prisma;
  }
}

export { DatabaseConnection };
