import React from "react";
import type { textProps } from "../../interfaces/textProps";

const Ptxt: React.FC<textProps> = ({ text }) => {
  return (
    <p className="text-lightText dark:text-darkText font-sharetech transition-all">{text}</p>
  );
};

export default Ptxt;
