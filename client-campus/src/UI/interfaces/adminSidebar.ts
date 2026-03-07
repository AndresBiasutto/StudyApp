import React from "react";
import type { navInfo } from "./navInfo";

export interface adminSidebar {
  sidebarOpen: boolean;
  activeTab: number;
  navItems: navInfo[];
  // setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  onCloseSidebar: () => void;
}
