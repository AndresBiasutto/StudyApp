import React from "react";
import type { IButtonProps } from "../../interfaces/buttonProps";

const ButtonRounded: React.FC<IButtonProps> = ({
  btnName,
  action,
  icon,
  bgLight,
  bgDark,
}) => {
  return (
    <button
      className={`group h-7 w-7 cursor-pointer flex justify-center items-center ${bgLight} ${bgDark} transition-all font-pixelify text-lightText dark:text-darkText rounded-full shadowDN`}
      onClick={action}
      title={btnName}
    >
      <i className=" md:group-hover:scale-110">{icon} </i>
    </button>
  );
};

export default ButtonRounded;
