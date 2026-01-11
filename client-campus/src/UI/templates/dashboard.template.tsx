import { Outlet } from "react-router-dom";
import Sidebar from "../organisms/dashboard/sidebar.organism";
import DashboardHeader from "../organisms/dashboard/dashboardHeader.organism";
import SettingsMenu from "../organisms/dashboard/settingsMenu.organism";
import DashboardFooter from "../organisms/dashboard/dashboardFooter.organism";
const Dashboard = () => {
  return (
    <div className="flex flex-row items-start justify-start">
      <Sidebar />
      <div className=" bg-lightPrimary dark:bg-darkPrimary flex flex-col justify-start items-center w-full min-h-screen overflow-y-auto">
        <DashboardHeader />
        <div className="mt-12">
          <SettingsMenu />
          <Outlet />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};
export default Dashboard;
