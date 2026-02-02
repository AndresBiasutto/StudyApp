import { useState } from "react";
import AdminSidebar from "../components/organisms/admin/adminSidebar.organism";
import { Outlet } from "react-router-dom";
import ButtonRounded from "../components/atoms/buttonRounded.atom";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

const navItems = [
  { name: "usuarios", navLink: "/dashboard/admin/users" },
  { name: "materias", navLink: "/dashboard/admin/subjects" },
  { name: "mensajes", navLink: "/dashboard/admin/message" },
];
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navItems={navItems}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
      <div className="fixed top-1/2 bottom-1/2 left-2 md:hidden">
        <ButtonRounded
          btnName={"menu administrador"}
          bgLight="bg-lightSecondary"
          bgDark="dark:bg-darkSecondary"
          action={() => setSidebarOpen(true)}
          icon={<TbLayoutSidebarRightExpand />}
        />
      </div>
      <div className="w-full md:mr-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
