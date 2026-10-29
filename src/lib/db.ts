// Prisma client singleton. Always import `db` from here — never construct
// PrismaClient directly (hot-reload would open one connection per module
// instance and exhaust SQLite handles).

import { PrismaClient } from "@prisma/client";
import { runtimeDatabaseUrl } from "./db-path";

const globalForPrisma = globalThis as unknown as { __wellnessPrisma?: PrismaClient };

function createClient(): PrismaClient {
  const url = runtimeDatabaseUrl();
  return new PrismaClient({
    datasources: { db: { url } },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const db = globalForPrisma.__wellnessPrisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__wellnessPrisma = db;
}
