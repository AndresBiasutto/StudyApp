import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import logo from "../../assets/logo.svg";
import SidebarAside from "../molecules/sidebarAside.molecule";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed inset-0 z-20 bg-lightSecondary dark:bg-darkSecondary opacity-20 hover:opacity-45 transition-all duration-200"
        />
      )}
      <SidebarAside isOpen={sidebarOpen} logo={logo} />
    </>
  );
};

export default Sidebar;
