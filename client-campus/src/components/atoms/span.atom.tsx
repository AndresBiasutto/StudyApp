import React from "react";
import type { textProps } from "../../interfaces/textProps";

const Span: React.FC<textProps> = ({ text }) => {
  return (
    <span className="font-sharetech font-semibold text-lightText dark:text-darkText ">
      {text}
    </span>
  );
};

export default Span;
