import { useState } from "react";
import AdminSidebar from "../components/organisms/admin/adminSidebar.organism";
// import AdminWindow from "../components/organisms/admin/adminWindow.organism";
import AdminUsersTab from "../components/organisms/admin/adminUsersTab.organism";

const tabItems = ["usuarios", "materias", "mensajes"];
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabItems={tabItems}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
      {/* <AdminWindow activeTab={activeTab} /> */}
    <div className="bg-lightPrimary dark:bg-darkPrimary flex flex-col w-full min-h-screen overflow-y-auto md:ml-64">
      {activeTab === 0 ? (
        <AdminUsersTab />
      ) : activeTab === 1 ? (
        <div className="w-full  flex flex-row justify-center items-center font-sharetech text-lightText dark:text-darkText bg-lightAccent">
          subjects
        </div>
      ) : (
        <div className="w-full  flex flex-row justify-center items-center font-sharetech text-lightText dark:text-darkText bg-lightAccent">
          messjes
        </div>
      )}
      </div>

    </div>
  );
};

export default AdminDashboard;
