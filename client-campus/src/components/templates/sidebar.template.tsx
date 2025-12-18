import type { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import { NavLink } from "react-router-dom";
import logo from "../../assets/react.svg"

const Sidebar: React.FC = () => {
    const dispatch= useDispatch()
    const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  return (
    <div>
      {sidebarOpen && (
        <div
          onClick={() => dispatch(toggleSidebar()) }
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-lightBorder dark:bg-darkBorder transform transition duration-300  ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-8">
      <NavLink to="/" className="flex items-center">
        <img className=" w-14 p-4" src={logo} alt="logo" />
      </NavLink>
        </div>

        <nav className="mt-10">
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25"
            href="#"
          >
            <span className="mx-3">Dashboard</span>
          </a>
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:text-gray-100"
            href="#"
          >
            <span className="mx-3">UI Elements</span>
          </a>
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:text-gray-100"
            href="#"
          >
            <span className="mx-3">Tables</span>
          </a>
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:text-gray-100"
            href="#"
          >
            <span className="mx-3">Forms</span>
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
