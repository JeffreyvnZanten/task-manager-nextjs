import { project } from "@/db/schemas/project-schema";
import { eq } from "drizzle-orm";
import { db } from ".";

type Project = {
  id: number;
  title: string;
  user_id: string;
};

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
