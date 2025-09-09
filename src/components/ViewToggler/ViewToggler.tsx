"use client";

import { useState } from "react";
import ViewTab from "./ViewTab";

type ViewType = "Card View" | "Kanban View" | "Table View";

function ViewToggler() {
  const [activeTab, setActiveTab] = useState("Card View" as ViewType);

  return (
    <menu className="flex text-[0.8rem]">
      <ViewTab
        title="Card View"
        isActive={activeTab === "Card View"}
        handleOnClick={() => setActiveTab("Card View")}
      />
      <ViewTab
        title="Kanban View"
        isActive={activeTab === "Kanban View"}
        handleOnClick={() => setActiveTab("Kanban View")}
      />
      <ViewTab
        title="Table View"
        isActive={activeTab === "Table View"}
        handleOnClick={() => setActiveTab("Table View")}
      />
    </menu>
  );
}
export default ViewToggler;
