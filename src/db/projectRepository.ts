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

export async function GetProjectById(id: number): Promise<Project | null> {
  const result = await db
    .select()
    .from(project)
    .where(eq(project.id, id))
    .limit(1);
  return result[0] || null;
}
