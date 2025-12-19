import React from "react";
import type { IButtonProps } from "../../interfaces/buttonProps";

const ButtonRounded: React.FC<IButtonProps> = ({
  action,
  icon,
  bgLight,
  bgDark,
}) => {
  return (
    <button
      className={`group h-7 w-7 cursor-pointer center p-2 m-1 ${bgLight} ${bgDark} transition-all font-pixelify text-lightText dark:text-darkText rounded-full shadowDN`}
      onClick={action}
    >
      <i className=" md:group-hover:scale-105 text-2xl">{icon} </i>
    </button>
  );
};

export default ButtonRounded;
