import NavItem from "../atoms/navItem.atom";

const SidebarNav = () => {
  return (
    <nav className="mt-10 p-8 list-none gap-2 flex flex-col justify-start items-end">
      <NavItem to={"/dashboard/userdashboard"} text={"dashboard"} />
      <NavItem to={"/dashboard/createdsubjects"} text={"materias que dicto"} />
      <NavItem
        to={"/dashboard/enroledsubjects"}
        text={"materias que estudio"}
      />
      <NavItem to={"/dashboard/settings"} text={"settings"} />
    </nav>
  );
};

export default SidebarNav;
