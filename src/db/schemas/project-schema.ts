import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const project = sqliteTable("project", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
});
