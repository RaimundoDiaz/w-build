import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { baseModelColumns } from "./common/baseModelColumns";
import { projectSchema } from "./Project.schema";
import { userSchema } from "./User.schema";

export const investmentSchema = pgTable("investment", {
  ...baseModelColumns,
  amount:    integer("amount").notNull(),
  projectId: varchar("project_id", { length: 36 })
    .references(() => projectSchema.id)
    .notNull(),
  userId: varchar("user_id", { length: 36 })
    .references(() => userSchema.id)
    .notNull()
});
