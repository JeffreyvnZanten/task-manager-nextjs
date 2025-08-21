import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schemas/auth-schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "postgresql"
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.AUTH_SECRET,
  plugins: [nextCookies()],
});
