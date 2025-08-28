import { db } from ".";
import { eq } from "drizzle-orm";
import { card } from "./schemas/card-schema";
import { Card } from "@/types";

export async function getAllCardsForProject(
  projectId: number
): Promise<Card[]> {
  try {
    const result = await db
      .select()
      .from(card)
      .where(eq(card.project_id, projectId));
    return result;
  } catch (error: any) {
    console.error("Error fetching cards for project:", error);
    throw error;
  }
}
