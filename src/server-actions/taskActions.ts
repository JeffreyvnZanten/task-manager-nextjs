"use server";

import {
  createTask,
  deleteTask,
  GetAllTasksByProjectId,
} from "@/db/taskRepository";
import { Task } from "@/types";
import { revalidatePath } from "next/cache";

async function getAllTasksAction(id: number): Promise<Task[]> {
  console.log("getAllTasksAction called");

  if (id !== undefined || id !== null) {
    const result = await GetAllTasksByProjectId(id);
    return result;
  }

  return [];
}

async function createTaskAction(
  title: string,
  projectId: number
): Promise<void> {
  console.log("createTaskAction called with title:", title);

  const created = await createTask(title, projectId);
  if (created) revalidatePath(`/projects/${projectId}/`);
}

async function deleteTaskAction(cardId: number): Promise<void> {
  console.log("deleteCardAction called with cardId:", cardId);

  let result = null;

  if (cardId !== undefined || cardId !== null) {
    result = await deleteTask(cardId);
    console.log("Card deleted:", result);
  }

  if (result) revalidatePath(`/projects/${cardId}/`);
}

export { getAllTasksAction, createTaskAction, deleteTaskAction };
