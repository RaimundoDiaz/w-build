import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { baseModelColumns } from "./common/baseModelColumns";

export const projectSchema = pgTable("project", {
  ...baseModelColumns,
  name:           varchar("name", { length: 256 }).notNull(),
  description:    varchar("description", { length: 512 }),
  imageUrl:       varchar("image_url", { length: 512 }),
  location:       varchar("location", { length: 256 }).notNull(),
  targetAmount:   integer("target_amount").notNull(),
  currentAmount:  integer("current_amount").notNull(),
  minInvestment:  integer("min_investment").notNull(),
  expectedReturn: varchar("expected_return", { length: 256 }).notNull(),
  investors:      integer("investors").notNull(),
  status:         varchar("status", { length: 256 }).notNull()
});
