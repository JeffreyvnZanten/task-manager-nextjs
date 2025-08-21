import LoginForm from "@/components/LoginForm";
import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";

async function getUsers() {
  const result = await db.select().from(user);
  return result;
}

export default async function SignIn() {
  // const users = await getUsers();
  // console.log("Fetched users:", users);
  return <LoginForm />;
}
