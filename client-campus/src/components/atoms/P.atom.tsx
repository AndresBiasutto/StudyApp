import React from "react";
import type { textProps } from "../../interfaces/textProps";

const Ptxt: React.FC<textProps> = ({ text, aditionalStyle }) => {
  return (
    <p className={`text-lightText dark:text-darkText font-sharetech transition-all ${aditionalStyle} `}>{text}</p>
  );
};

export default Ptxt;
