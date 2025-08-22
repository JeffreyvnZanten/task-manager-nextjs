import { createDummyProjects } from "@/db/seed/createDummyProjects";
import { createUsers } from "./createUsers";

async function seed() {
  console.log("🌱 Starting seed process...");
  createUsers();
  createDummyProjects();
}

async function main() {
  try {
    await seed();
  } catch (error) {
    console.error("Main process failed:", error);
    process.exit(1);
  }
}

main();
