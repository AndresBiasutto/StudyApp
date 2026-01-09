import React from "react";
import type { sidebar } from "../../interfaces/sidebar";
import SidebarNav from "./sidebarNav.molecule";

const SidebarAside: React.FC<sidebar> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed inset-y-0 z-50 left-0 top-12 w-64 overflow-y-auto bg-lightSecondary dark:bg-darkSecondary transform transition duration-300  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarNav />
    </aside>
  );
};

export default SidebarAside;
