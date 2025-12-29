import { Outlet } from "react-router-dom";
import Sidebar from "../components/templates/sidebar.template";
import ButtonRounded from "../components/atoms/buttonRounded.atom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/store/slices/uiSlice";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-start justify-start">
      <Sidebar />
      <div className=" bg-lightPrimary dark:bg-darkPrimary flex flex-col justify-start items-center w-full min-h-screen overflow-y-auto">
        <div className="fixed py-2 px-8 opacity-50 hover:opacity-100 transition-all w-full flex items-center justify-end">
          <ButtonRounded
            btnName="mostrar menu"
            action={() => dispatch(toggleSidebar())}
            icon={<BsLayoutTextSidebarReverse />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
