import React from "react";

export interface adminSidebar {
  sidebarOpen: boolean;
  activeTab: number;
  tabItems: string[];
  // setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  onCloseSidebar: () => void;
}
