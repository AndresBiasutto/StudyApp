import { Outlet } from "react-router-dom";
import SidebarMenu from "../organisms/dashboard/sidebarMenu.organism";
import DashboardHeader from "../organisms/dashboard/dashboardHeader.organism";
import SettingsMenu from "../organisms/dashboard/settingsMenu.organism";
import DashboardFooter from "../organisms/dashboard/dashboardFooter.organism";
const Dashboard = () => {
  return (
    <div className="flex flex-row items-start justify-start">
      <SidebarMenu />
      <div className=" bg-lightPrimary dark:bg-darkPrimary flex flex-col justify-start items-center w-full min-h-screen overflow-y-auto">
        <DashboardHeader />
        <div className="mt-12 w-full">
          <SettingsMenu />
          <Outlet />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};
export default Dashboard;
