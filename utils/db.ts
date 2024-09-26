import { PrismaClient } from "@prisma/client";

declare global {
  // This is necessary to avoid TypeScript errors when adding properties to globalThis
  var prismaGlobal: PrismaClient | undefined;
}

const db: PrismaClient = globalThis.prismaGlobal || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}

export default db;

//globalThis.prisma: This global variable ensures that the PrismaClient instance is created only once and shared across all modules that import it. This is important because creating a new PrismaClient instance for each module that imports it can lead to performance issues and memory leaks.
