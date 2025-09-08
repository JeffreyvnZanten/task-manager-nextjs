import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { project } from "./project-schema";

export const task = sqliteTable("task", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  status: text("status").notNull(),
  project_id: integer("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
});
