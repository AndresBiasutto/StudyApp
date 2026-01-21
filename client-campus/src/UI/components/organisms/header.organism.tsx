import { NavLink } from "react-router-dom";
import NavBar from "../organisms/navBar.organism";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="md:static h-full w-full px-8 flex flex-row justify-between items-center transition-all bg-lightSecondary dark:bg-darkSecondary ">
      <NavLink to="/" className="flex items-center">
        <img className=" w-8 py-2" src={logo} alt="logo" />
      </NavLink>
      <NavBar />
    </header>
  );
};

export default Header;
