import { eq } from "drizzle-orm";
import { db } from ".";
import { Task } from "@/types";
import { task } from "./schemas/task-schema";

async function GetAllTasksByProjectId(projectId: number): Promise<Task[]> {
  const rows = await db
    .select()
    .from(task)
    .where(eq(task.project_id, projectId));

  return rows.map((r) => ({
    id: Number(r.id),
    title: r.title ?? "",
    project_id: Number(r.project_id),
    status: r.status as Task["status"],
  }));
}

async function createTask(title: string, projectId: number): Promise<boolean> {
  try {
    const result = await db.insert(task).values({
      title,
      project_id: projectId,
      status: "todo",
    });
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error creating task:", error);
    return false;
  }
}

async function deleteTask(id: number): Promise<boolean> {
  try {
    const result = await db.delete(task).where(eq(task.id, id));
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
}

export { GetAllTasksByProjectId, createTask, deleteTask };
