import { NavLink } from "react-router-dom";
import type { navItemProps } from "../../interfaces/navItemProps";

const NavItem: React.FC<navItemProps> = ({ to, text }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block py-2 pr-4 pl-2 rounded md:p-0 hover:underline  p-1 font-pixelify transition-all
        ${isActive ? "text-lightDetail dark:text-darkDetail underline" : "text-lightText dark:text-darkText transition-all "}`
      }
    >
      {text}
    </NavLink>
  </li>
);

export default NavItem