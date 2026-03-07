import { Outlet } from "react-router-dom";
import SidebarMenu from "../organisms/dashboard/sidebarMenu.organism";
import DashboardHeader from "../organisms/dashboard/dashboardHeader.organism";
import SettingsMenu from "../organisms/dashboard/settingsMenu.organism";
import DashboardFooter from "../organisms/dashboard/dashboardFooter.organism";
import { useAppSelector } from "../../../hooks/UseStore.hook";
import type { RootState } from "../../../store/store";
const Dashboard = () => {
    const { sidebarOpen } = useAppSelector((state: RootState) => state.ui);
  
  return (
    <div className="flex flex-row items-start justify-start">
      <SidebarMenu />
      <div className=" bg-lightPrimary dark:bg-darkPrimary flex flex-col justify-start items-center w-full min-h-screen overflow-y-auto">
        <DashboardHeader />
        <div className={`min-h-screen w-full md:w-2/3 transition-all mt-12 ${sidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
          <SettingsMenu />
          <Outlet />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};
export default Dashboard;
