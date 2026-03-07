import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import {
  toggleSettingsMenu,
  toggleTheme,
} from "../../../../store/slices/uiSlice";
import { FaRegLightbulb } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import CloseBackground from "../../molecules/closeBackground.molecule";
import Navigation from "../../molecules/navigation.molecule";
import Button from "../../atoms/button.atom";
import { logout } from "../../../../store/slices/authSlice/auth.slice";
import { useNavigate } from "react-router-dom";
const navItems = [{ navLink: "/settings", name: "settings" }];
const SettingsMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settingsMenuOpen } = useSelector((state: RootState) => state.ui);

  const handleExit = () => {
    dispatch(toggleSettingsMenu())
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <CloseBackground
        isOpen={settingsMenuOpen}
        action={() => dispatch(toggleSettingsMenu())}
      />
      <aside
        className={`fixed right-6 top-14 z-50 flex flex-col justify-end items-end p-2 overflow-y-auto bg-lightPrimary dark:bg-darkPrimary rounded-2xl border border-lightBorder dark:border-darkBorder transform transition duration-300  ${
          settingsMenuOpen ? "translate-x-0" : "translate-x-64"
        }`}
      >
        <Navigation
          navInfo={navItems}
          action={() => dispatch(toggleSettingsMenu())}
        />
        <Button
          btnName="dia/noche"
          action={() => dispatch(toggleTheme())}
          icon={<FaRegLightbulb />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
        <Button
          btnName="salir"
          action={() => handleExit()}
          icon={<BiLogOut />}
          bgLight="bg-lightWarning"
          bgDark="dark:bg-darkWarning"
        />
      </aside>
    </>
  );
};

export default SettingsMenu;
