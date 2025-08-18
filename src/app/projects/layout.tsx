import LeftHeader from "@/components/LeftHeader";
import RightHeader from "@/components/RightHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await prisma.user.findUnique({
    where: { username: "JefvnZanten" },
  });

  return (
    <html lang="en">
      <body>
        <div className="flex justify-between">
          <LeftHeader>
            <button className="bg-blue-400 px-3 rounded-xl">Add Project</button>
          </LeftHeader>
          <RightHeader>
            <p>Hi, {user?.name}</p>
            <button className="bg-blue-400 px-3 rounded-xl">Settings</button>
          </RightHeader>
        </div>
        {children}
      </body>
    </html>
  );
}
