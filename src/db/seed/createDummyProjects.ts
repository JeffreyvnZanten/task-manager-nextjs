import { project } from "@/db/schemas/project-schema";
import { db } from "@/db";
import { getUserId } from "@/db/userRepository";

export function createDummyProjects() {
  createProjects("jefvnzanten@gmail.com");
  createProjects("testgebruiker@test.nl");
}

const projects = [
  {
    title: "Project 1",
  },
  {
    title: "Project 2",
  },
  {
    title: "Project 3",
  },
];

async function createProjects(username: string) {
  const userId = await getUserId(username);

  console.log("User ID:", userId);
  try {
    const result = await db.insert(project).values({
      title: "Project 1",
      user_id: userId,
    });

    console.log(result);
  } catch (error: any) {
    throw error;
  }

  try {
    const result = await db.insert(project).values({
      title: "Project 2",
      user_id: userId,
    });

    console.log(result);
  } catch (error: any) {
    throw error;
  }
}
