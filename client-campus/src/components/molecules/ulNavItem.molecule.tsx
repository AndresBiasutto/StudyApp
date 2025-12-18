import NavItem from "../atoms/navItem.atom";

const UlNavItem = () => {
  return (
    <ul className="flex flex-row md:space-x-8 md:text-sm md:font-medium">

      <NavItem to="/" text="Inicio" />
      <NavItem to="/unitone" text="Unidad 1" />
      <NavItem to="/unittwo" text="Unidad 2" />
      <NavItem to="/unitthree" text="Unidad 3" />
      <NavItem to="/unitfour" text="Unidad 4" />
      <NavItem to="/unitfive" text="Unidad 5" />
    </ul>
  );
};

export default UlNavItem;
