import { pgTable, varchar } from "drizzle-orm/pg-core";

import { baseModelColumns } from "./common/baseModelColumns";

export const projectSchema = pgTable("project", {
  ...baseModelColumns,
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }),
  imageUrl: varchar("image_url", { length: 512 }),
});
