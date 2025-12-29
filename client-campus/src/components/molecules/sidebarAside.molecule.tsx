import React from "react";
import type { sidebar } from "../../types/sidebar";
import { NavLink } from "react-router-dom";
import SidebarNav from "./sidebarNav.molecule";

const SidebarAside: React.FC<sidebar> = ({ isOpen, logo }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-lightSecondary dark:bg-darkSecondary transform transition duration-300  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className=" flex items-center justify-start mt-2 ml-8">
        <NavLink to="/" className="flex items-center">
          <img className="w-8" src={logo} alt="logo" />
        </NavLink>
      </div>
      <SidebarNav />
    </aside>
  );
};

export default SidebarAside;
