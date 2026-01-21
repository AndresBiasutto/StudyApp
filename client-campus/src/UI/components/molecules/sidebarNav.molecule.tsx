import NavItem from "../atoms/navItem.atom";

const SidebarNav = () => {
  return (
    <nav className="mt-10 p-8 list-none gap-2 flex flex-col justify-start items-end">
      <NavItem to={"/dashboard/creatordashboard"} text={"nueva materia"} />
      <NavItem to={"/dashboard/studentdashboard"} text={"estudiar"} />
      <NavItem to={"/dashboard/enroledsubjects"} text={"explorar"} />
      <NavItem to={"/dashboard/settings"} text={"settings"} />
    </nav>
  );
};

export default SidebarNav;
