import React from "react";
import { Link } from "react-router-dom";
import image from "../../../../assets/monopc.svg";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const Header = () => {
  return (
    <header className="fixed w-full top-0 py-3 px-6 bg-lightSecondary dark:bg-darkSecondary border-b border-lightBorder dark:border-darkBorder z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={image} alt="Campus logo" className="w-10 h-10" />
          <span className="font-pixelify text-xl text-lightText dark:text-darkText">Campus</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary border border-lightBorder dark:border-darkBorder text-lightText dark:text-darkText hover:opacity-90 transition-all"
          >
            <FiLogIn />
            <span>Login</span>
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-lightAccent dark:bg-darkAccent text-lightText dark:text-darkText hover:opacity-95 transition-all"
          >
            <FiUserPlus />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
