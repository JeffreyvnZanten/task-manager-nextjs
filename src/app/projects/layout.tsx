import LeftHeader from "@/components/LeftHeader";
import RightHeader from "@/components/RightHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function logoutAction() {
  "use server";

  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <html lang="en">
      <body>
        <div className="flex justify-between">
          <LeftHeader>
            <button className="bg-blue-400 px-3 rounded-xl">Add Project</button>
          </LeftHeader>
          <RightHeader>
            <p>Hi, {session.user?.name}</p>
            <button
              className="bg-red-800 px-4 py-1 rounded-xl"
              onClick={logoutAction}
            >
              Log out
            </button>
          </RightHeader>
        </div>
        {children}
      </body>
    </html>
  );
}
