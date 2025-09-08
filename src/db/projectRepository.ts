import { project } from "@/db/schemas/project-schema";
import { eq } from "drizzle-orm";
import { db } from ".";
import { Project } from "@/types";

export async function getAllProjectsForUser(id: string): Promise<Project[]> {
  try {
    const result = await db
      .select()
      .from(project)
      .where(eq(project.user_id, id));
    return result;
  } catch (error: any) {
    console.error("Error fetching projects for user:", error);
    throw error;
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const result = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1);
    return result[0] || null;
  } catch (error: unknown) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
}

export async function createProject(
  title: string,
  userId: string
): Promise<boolean> {
  try {
    const newProject = {
      title,
      user_id: userId,
    };
    const result = await db.insert(project).values(newProject);
    return result.rowsAffected > 0;
  } catch (error: unknown) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function deleteProject(id: number): Promise<boolean> {
  console.log("deleteProject called with id:", id);
  try {
    const result = await db.delete(project).where(eq(project.id, id));
    return result.rowsAffected > 0;
  } catch (error: unknown) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
