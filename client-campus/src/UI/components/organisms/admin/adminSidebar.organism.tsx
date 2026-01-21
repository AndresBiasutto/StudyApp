import type { adminSidebar } from "../../../interfaces/adminSidebar";
import Tabs from "../../molecules/tabs.molecule";

const AdminSidebar: React.FC<adminSidebar> = ({
  activeTab,
  setActiveTab,
  tabItems,
  sidebarOpen,
  onCloseSidebar,
}) => {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={onCloseSidebar}
        />
      )}
      <aside
        className={`
          fixed z-20 left-0 top-0 pt-12 p-6 w-64 min-h-screen
          bg-lightPrimary dark:bg-darkPrimary
          border-r border-lightBorder dark:border-darkBorder
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Tabs
          tabItems={tabItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </aside>
    </>
  );
};

export default AdminSidebar;
