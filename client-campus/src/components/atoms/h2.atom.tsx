import React from "react";
import type { textProps } from "../../interfaces/textProps";

const H2: React.FC<textProps> = ({ text }) => {
  return (
    <h2 className="text-2xl font-semibold font-pixelify text-lightText dark:text-darkText">
      {text}
    </h2>
  );
};

export default H2;
