// app/login/actions.ts
"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProject, deleteProject } from "@/db/projectRepository";
import { headers } from "next/headers";
import { getUserId } from "@/db/userRepository";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await auth.api.signInEmail({
    body: { email, password },
  });

  if (result) {
    revalidatePath("/", "layout");
    redirect("/projects");
  }
}

export async function createProjectAction(title: string) {
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

export async function deleteProjectAction(projectId: number) {
  console.log("Deleting project:", projectId);
  const deleted = await deleteProject(projectId);
  console.log("Project deleted:", deleted);
  // if (deleted) revalidatePath("/projects");
}
