import React from "react";
import type { IButtonProps } from "../../interfaces/buttonProps";

const ButtonSquare: React.FC<IButtonProps> = ({
  btnName,
  action,
  icon,
  bgLight,
  bgDark,
}) => {
  return (
    <button
      className={`group h-12 w-12 md:h-6 md:w-6 cursor-pointer flex justify-center items-center ${bgLight} ${bgDark} transition-all font-pixelify text-lightText dark:text-darkText border border-lightText dark:border-darkText rounded shadowDN`}
      onClick={action}
      title={btnName}
    >
      <i className=" md:group-hover:scale-110 text-2xl md:text-base">{icon} </i>
    </button>
  );
};

export default ButtonSquare;