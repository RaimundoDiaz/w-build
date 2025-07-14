import { pgTable, varchar } from "drizzle-orm/pg-core";

import { baseModelColumns } from "./common/baseModelColumns";

export const userSchema = pgTable("user", {
  ...baseModelColumns,
  email:             varchar("email", { length: 256 }).notNull().unique(),
  encryptedPassword: varchar("encrypted_password", { length: 256 })
});
