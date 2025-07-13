import { sql } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Contains base attributes for all models.
 */
export const baseModelColumns = {
  id:        varchar("id", { length: 36 }).primaryKey().notNull().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow()
};
