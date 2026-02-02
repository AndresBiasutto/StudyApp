import type { adminSidebar } from "../../../interfaces/adminSidebar";
import CloseBackground from "../../molecules/closeBackground.molecule";
import Navigation from "../../molecules/navigation.molecule";

const AdminSidebar: React.FC<adminSidebar> = ({
  // activeTab,
  // setActiveTab,
  navItems,
  sidebarOpen,
  onCloseSidebar,
}) => {
  return (
    <>
      {sidebarOpen && (
        <CloseBackground isOpen={sidebarOpen} action={() => onCloseSidebar()} />
      )}
      <aside
        className={`
          fixed z-50 md:z-30 right-0 top-12 pt-12 p-6 w-64 min-h-screen
          bg-lightPrimary dark:bg-darkPrimary
          border-l border-lightBorder dark:border-darkBorder
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0
        `}
      >
        <Navigation navInfo={navItems} action={onCloseSidebar} />
      </aside>
    </>
  );
};

export default AdminSidebar;
