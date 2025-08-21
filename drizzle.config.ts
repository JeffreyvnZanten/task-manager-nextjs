import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas/**/*.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `file:${process.env.DATABASE_FILE!}`,
  },
});
