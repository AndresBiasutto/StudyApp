import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import {
  toggleSettingsMenu,
  toggleTheme,
} from "../../redux/store/slices/uiSlice";
import { FaRegLightbulb } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import CloseBackground from "../commons/closeBackground.common";
import Navigation from "../molecules/navigation.molecule";
import Button from "../atoms/button.atom";
const navItems = [{ navLink: "/settings", name: "settings" }];
const SettingsMenu = () => {
  const dispatch = useDispatch();
  const { settingsMenuOpen } = useSelector((state: RootState) => state.ui);
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
          action={() => alert("salir")}
          icon={<BiLogOut />}
          bgLight="bg-lightWarning"
          bgDark="dark:bg-darkWarning"
        />
      </aside>
    </>
  );
};

export default SettingsMenu;
