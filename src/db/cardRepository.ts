import { db } from ".";
import { eq } from "drizzle-orm";
import { card } from "./schemas/card-schema";
import { Card } from "@/types";

export async function GetAllCardsByProjectId(
  projectId: number
): Promise<Card[]> {
  const rows = await db
    .select()
    .from(card)
    .where(eq(card.project_id, projectId));

  return rows.map((r) => ({
    id: Number(r.id),
    title: r.title ?? "",
    project_id: Number(r.project_id),
    status: r.status as Card["status"],
  }));
}
