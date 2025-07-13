import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schemas";

const client = new Pool({
  connectionString: process.env.DB_POSTGRES_CONNECTION_URI!
});

const db = drizzle(client, { schema, logger: true });

export default db;
