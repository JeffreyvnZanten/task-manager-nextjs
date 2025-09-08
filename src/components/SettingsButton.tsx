"use client";

import { useState } from "react";

type SettingsButtonProps = {
  toggleSettingsMenu: () => void;
};

export default function SettingsButton({
  toggleSettingsMenu,
}: SettingsButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsActive(!isActive);
    toggleSettingsMenu();
  };

  return (
    <img
      onClick={handleClick}
      src="/setting-icon.svg"
      className={`w-[2em] h-[2em] cursor-pointer opacity-100 hover:opacity-70 ${
        isActive ? "brightness-250 opacity-100" : "brightness-70 opacity-50"
      }`}
      alt="Settings Icon"
    />
  );
}
