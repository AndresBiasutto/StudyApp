import { Outlet } from "react-router-dom";
import Sidebar from "../components/templates/sidebar.template";

const Dashboard = () => {
  return (
    <div className="flex flex-row items-start justify-start">
      <Sidebar />
      <div className="bg-lightPrimary dark:bg-darkPrimary flex flex-col justify-start items-center w-full min-h-screen overflow-y-auto" >
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
