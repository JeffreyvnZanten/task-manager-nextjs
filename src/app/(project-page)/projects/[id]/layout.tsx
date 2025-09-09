import LeftHeader from "@/components/LeftHeader";
import ProjectTitle from "@/components/ProjectTitle";
import RightHeader from "@/components/RightHeader";
import ViewToggler from "@/components/ViewToggler/ViewToggler";
import { getProjectById } from "@/db/projectRepository";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

async function logoutAction() {
  "use server";

  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}

async function createProject() {
  "use server";

  console.log("Create project");
}

export default async function Layout({ params, children }: LayoutProps) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return <div>Not authenticated</div>;

  const { id } = await params;
  const projectId = Number.parseInt(id, 10);
  if (Number.isNaN(projectId)) return <div>Invalid project id</div>;
  console.log("Project ID in layout:", projectId);

  const project = await getProjectById(Number(id));
  console.log("Project in layout:", project);

  return (
    <div>
      <header className="flex justify-center w-full h-[8vh]">
        <div className="flex justify-between xl:w-[40%] lg:w-[60%] w-[100%] bg-black">
          <LeftHeader>
            {project && <ProjectTitle title={project.title} />}
          </LeftHeader>
          <RightHeader>
            <ViewToggler />
            {/* <p className="text-sm lg:text-md">Hi, {session.user?.name}</p> */}
            <button
              className="bg-red-800 px-4 py-1 rounded-xl text-sm cursor-pointer"
              onClick={logoutAction}
            >
              x
            </button>
          </RightHeader>
        </div>
      </header>
      {children}
    </div>
  );
}
