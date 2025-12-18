import React from "react";
import type { textProps } from "../../interfaces/textProps";

const H1: React.FC<textProps> = ({text}) => {
  return (
    <h1 className="text-3xl font-medium font-pixelify text-lightText dark:text-darkText">
      {text}
    </h1>
  );
};

export default H1;
