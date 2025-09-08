"use server";

import { createProject, deleteProject } from "@/db/projectRepository";
import { headers } from "next/headers";
import { getUserId } from "@/db/userRepository";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function createProjectAction(title: string): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let userId = "";

  if (session !== null) {
    userId = await getUserId(session.user?.email!);
  }

  console.log("Creating project:", title);
  const created = await createProject(title, userId);
  if (created) revalidatePath(`/projects/`);
}

export async function deleteProjectAction(projectId: number): Promise<void> {
  console.log("Deleting project:", projectId);
  let result = null;

  if (projectId !== undefined || projectId !== null) {
    result = await deleteProject(projectId);
    console.log("Project deleted:", result);
  }

  if (result) revalidatePath(`/projects/`);
}
