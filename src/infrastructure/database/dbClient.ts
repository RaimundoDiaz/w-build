import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schemas";

const client = new Pool({
  connectionString: process.env.DATABASE_URL!
});

const db = drizzle(client, { schema, logger: true });

export default db;
