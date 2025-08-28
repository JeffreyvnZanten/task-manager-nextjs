import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { project } from "./project-schema";

export const card = sqliteTable("card", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  project_id: integer("project_id")
    .notNull()
    .references(() => project.id),
});
