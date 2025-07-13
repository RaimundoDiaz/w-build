import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import { resolve } from "path";

// Load ENVs from root project directory.
const projectRootDir = resolve(__dirname, "..", "..", "..");
dotenv.config({ path: `${projectRootDir}/.env` });
dotenv.config({ path: `${projectRootDir}/.env.local`, override: true });

export default defineConfig({
  dialect: "postgresql",
  schema: "./schemas/**/*.schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
