import NavItem from "../atoms/navItem.atom";

const UlNavItem = () => {
  return (
    <ul className="flex flex-row md:space-x-4 md:text-sm md:font-medium">

      <NavItem to="/" text="Inicio" />
      <NavItem to="/dashboard/creatordashboard" text="crear" />
      <NavItem to="/dashboard/studentdashboard" text="estudiar" />
      <NavItem to="/unittwo" text="Unidad 2" />
      <NavItem to="/unitthree" text="Unidad 3" />
      <NavItem to="/unitfour" text="Unidad 4" />
      <NavItem to="/unitfive" text="Unidad 5" />
      <NavItem to="/auth/register" text="REGISTRATE" />
    </ul>
  );
};

export default UlNavItem;
