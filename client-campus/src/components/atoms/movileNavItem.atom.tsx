import { NavLink } from "react-router-dom";
type Props = {
  to: string;
  text: string;
  close?: () => void;
};
const MobileNavItem = ({ to, text, close }: Props) => (
  <li>
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) =>
        `block py-1 rounded md:p-0 hover:underline font-pixelify transition-all
        ${
          isActive
            ? "text-lightDetail dark:text-darkDetail underline"
            : "text-lightText dark:text-darkText transition-all "
        }`
      }
    >
      {text}
    </NavLink>
  </li>
);

export default MobileNavItem;
