import LeftHeader from "@/components/LeftHeader";
import RightHeader from "@/components/RightHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
            <button className="bg-blue-400 px-3 rounded-xl">Settings</button>
          </RightHeader>
        </div>
        {children}
      </body>
    </html>
  );
}
