import { user } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";
import { db } from ".";

export async function getUserId(email: string) {
  try {
    const result = await db.select().from(user).where(eq(user.email, email));
    return result[0]?.id;
  } catch (error: any) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
}
