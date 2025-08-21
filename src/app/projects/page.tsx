import Image from "next/image";

export default async function Home() {
  const projects = null;

  if (!projects)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        No projects found
      </div>
    );
  else return <div>projects loaded</div>;
}
