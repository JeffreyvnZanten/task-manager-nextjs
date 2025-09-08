import { project } from "@/db/schemas/project-schema";
import { db } from "@/db";
import { getUserId } from "@/db/userRepository";
import { task } from "../schemas/task-schema";

export function createDummyProjects() {
  createProjects("jefvnzanten@gmail.com");
  createProjects("testgebruiker@test.nl");
}

const projects = [
  {
    title: "Inbox",
    cards: [
      {
        title: "Op bezoek bij de buren",
      },
      {
        title: "Vakantie boeken Griekenland",
      },
    ],
  },
  {
    title: "Vandaag",
    cards: null,
  },
  {
    title: "Inkopen",
    cards: [
      {
        title: "Boodschappen",
        tasks: [
          {
            title: "Koop melk",
            completed: false,
          },
          {
            title: "Koop brood",
            completed: true,
          },
        ],
        dueDate: null,
        dueTime: null,
      },
    ],
  },
];

async function createProjects(username: string) {
  const userId = await getUserId(username);

  console.log("User ID:", userId);

  for (const projectData of projects) {
    try {
      const projectResult = await db.insert(project).values({
        title: projectData.title,
        user_id: userId,
      });

      const projectId = Number(projectResult.lastInsertRowid);
      console.log("Project ID:", projectId);

      if (projectData.cards !== null) {
        for (const cardData of projectData.cards) {
          try {
            const cardResult = await db.insert(task).values({
              title: cardData.title,
              project_id: projectId,
              status: "todo",
            });
          } catch (error: unknown) {
            throw error;
          }
        }
      }
    } catch (error: unknown) {
      throw error;
    }
  }
}
