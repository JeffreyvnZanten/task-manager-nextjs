import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// Maak eerst een libsql client
const client = createClient({
  url: `file:${process.env.DATABASE_FILE!}`,
});

// Geef de client door aan drizzle
export const db = drizzle(client);
