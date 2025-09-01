import AddButton from "@/components/AddButton";
import LeftHeader from "@/components/LeftHeader";
import RightHeader from "@/components/RightHeader";
import { GetProjectById } from "@/db/projectRepository";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type LayoutProps = {
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

export default async function Layout({ children }: LayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <header className="flex justify-center w-full h-[vh8]">
        <div className="flex justify-between xl:w-[40%] lg:w-[60%] w-[100%] bg-black">
          <LeftHeader>&nbsp;</LeftHeader>
          <RightHeader>
            <p className="text-sm lg:text-md">Hi, {session.user?.name}</p>
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
