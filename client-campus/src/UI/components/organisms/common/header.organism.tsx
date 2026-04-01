import React from "react";
import { Link } from "react-router-dom";
import image from "../../../../assets/monopc.svg";
import { FiLogIn, FiSun, FiMoon } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import { toggleTheme } from "../../../../store/slices/uiSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((s) => s.ui);

  return (
    <header className="fixed w-full top-0 py-3 px-6 bg-lightSecondary dark:bg-darkSecondary border-b border-lightBorder dark:border-darkBorder z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={image} alt="Campus logo" className="w-10 h-10" />
          <span className="font-pixelify text-xl text-lightText dark:text-darkText">Campusapiens</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary border border-lightBorder dark:border-darkBorder text-lightText dark:text-darkText hover:opacity-90 transition-all"
          >
            <FiLogIn />
            <span>Login</span>
          </Link>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary border border-lightBorder dark:border-darkBorder text-lightText dark:text-darkText hover:opacity-90 transition-all"
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
