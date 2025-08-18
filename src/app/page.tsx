import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function Home() {
  const user = await prisma.user.findUnique({
    where: { username: "JefvnZanten" },
  });

  if (user) {
    return <div className="">Hi there {user?.name}</div>;
  } else {
    return <div>hello world</div>;
  }
}
