import Link from "next/link";

export default function LeftHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex p-4 gap-2 xl:gap-4">
      <Link className="text-xl" href="/projects">
        Boards
      </Link>
      {children}
    </div>
  );
}
