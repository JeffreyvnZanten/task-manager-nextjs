import Link from "next/link";

export default function RightHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex p-4 gap-4 items-center">{children}</div>;
}
