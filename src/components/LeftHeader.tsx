import Link from "next/link";

export default function LeftHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex p-4 gap-4">
      <Link className="text-2xl" href="/projects">
        Projects
      </Link>
      {children}
    </div>
  );
}
