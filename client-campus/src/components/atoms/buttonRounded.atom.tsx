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
      className={`h-10 w-10 cursor-pointer center p-2 m-1 ${bgLight} ${bgDark} font-pixelify text-lightText dark:text-darkText rounded-full`}
      onClick={action}
    >
      <i className=" md:group-hover:scale-105 text-2xl">{icon} </i>
    </button>
  );
};

export default ButtonRounded;
