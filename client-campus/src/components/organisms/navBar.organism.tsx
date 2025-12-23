import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegLightbulb } from "react-icons/fa";
import ButtonRounded from "../atoms/buttonRounded.atom";
import { useDispatch } from "react-redux";
import { toggleTheme, toggleSidebar } from "../../redux/store/slices/uiSlice";
import UlNavItem from "../molecules/ulNavItem.molecule";
import { IoMdMenu } from "react-icons/io";
import Button from "../atoms/button.atom";

const NavBar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex flex-row justify-end items-end py-1 w-auto ">
      <div className="container flex flex-wrap justify-end items-center mx-auto">
        <div className="flex items-center md:hidden">
          <ButtonRounded
            btnName=""
            action={() => setOpen(!open)}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
            icon={<IoMdMenu />}
          />
        </div>
        <div className="hidden md:w-auto md:flex md:items-center gap-1 ">
          <UlNavItem />
          <ButtonRounded
            btnName=""
            action={() => dispatch(toggleTheme())}
            icon={<FaRegLightbulb />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full md:hidden mt-4 flex flex-col items-end justify-center"
            >
              <ul className="flex flex-col items-end space-y-2 md:text-sm md:font-medium pb-4">
                <MobileNavItem
                  to="/"
                  text="Inicio"
                  close={() => setOpen(false)}
                />
                <MobileNavItem
                  to="/dashboard/userdashboard"
                  text="dashboard"
                  close={() => setOpen(false)}
                />
                <MobileNavItem
                  to="/unittwo"
                  text="Unidad 2"
                  close={() => setOpen(false)}
                />
                <MobileNavItem
                  to="/unitthree"
                  text="Unidad 3"
                  close={() => setOpen(false)}
                />
                <MobileNavItem
                  to="/unitfour"
                  text="Unidad 4"
                  close={() => setOpen(false)}
                />
                <MobileNavItem
                  to="/unitfive"
                  text="Unidad 5"
                  close={() => setOpen(false)}
                />
              </ul>
              <Button
                btnName="mostrar menu"
                action={() => dispatch(toggleSidebar())}
                icon={<FaRegLightbulb />}
                bgLight="bg-lightAccent"
                bgDark="bg-darkAccent"
              />
              <ButtonRounded
                btnName=""
                action={() => dispatch(toggleTheme())}
                icon={<FaRegLightbulb />}
                bgLight="bg-lightAccent"
                bgDark="bg-darkAccent"
              />
              <MobileNavItem
                to="auth/register"
                text="REGISTRATE"
                close={() => setOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;

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
