import { useState } from "react";

function useSettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggleMenu,
  };
}

export default useSettingsMenu;
