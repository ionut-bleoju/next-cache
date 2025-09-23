import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const usersTable = sqliteTable("test_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  createdAt: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
