import AddButton from "@/components/AddButton";
import AddProject from "@/components/AddProject";
import ProjectCard from "@/components/ProjectCard";
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

  const createProject = async () => {
    "use server";

    console.log("Create project");
  };

  if (!projects)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        No projects found
      </div>
    );
  else
    return (
      <main className="flex justify-center py-[4em]">
        <div
          className="w-[80%] xl:w-[40%] lg:w-[60%] md:w-[80%]
        grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-[1em] 2xl:gap-[2em] xl:gap-[2em] lg:gap-[2em] md:gap-[2em] items-center"
        >
          <AddProject />
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    );
}
