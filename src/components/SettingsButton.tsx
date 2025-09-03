"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Props = { onClick: () => Promise<void> | void };

export default function SettingsButton({ onClick }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault(); // Link blokkeren
    e.stopPropagation(); // bubbling stoppen
    startTransition(async () => {
      await onClick(); // server action
      router.refresh(); // data opnieuw ophalen
    });
  };

  return (
    <img
      onClick={handleClick}
      src="/setting-icon.svg"
      className="w-[2em] h-[2em] cursor-pointer"
    />
  );
}
