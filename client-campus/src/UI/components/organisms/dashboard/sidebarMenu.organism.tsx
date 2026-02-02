import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { toggleSidebar } from "../../../../store/slices/uiSlice";
import CloseBackground from "../../molecules/closeBackground.molecule";
import Navigation from "../../molecules/navigation.molecule";

const navItems = [
  { navLink: "/", name: "inicio" },
  { navLink: "/dashboard/create", name: "crear" },
  { navLink: "/dashboard/study", name: "estudiar" },
  { navLink: "/dashboard/admin/users", name: "administrar" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  return (
    <>
      <CloseBackground
        isOpen={sidebarOpen}
        action={() => dispatch(toggleSidebar())}
      />
      <aside
        className={`fixed inset-y-0 z-50 left-0 top-12 w-64 overflow-y-auto bg-lightSecondary dark:bg-darkSecondary transform transition duration-300  ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Navigation
          navInfo={navItems}
          action={() => dispatch(toggleSidebar())}
        />
      </aside>
    </>
  );
};

export default Sidebar;
