import { getAllProjectsForUser } from "@/db/projectRepository";
import { getUserId } from "@/db/userRepository";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }
  const userId = await getUserId(session.user?.email!);
  const projects = await getAllProjectsForUser(userId);

  if (!projects)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        No projects found
      </div>
    );
  else
    return (
      <div>
        {projects.map((project) => (
          <div key={project.id}>{project.title}</div>
        ))}
      </div>
    );
}
