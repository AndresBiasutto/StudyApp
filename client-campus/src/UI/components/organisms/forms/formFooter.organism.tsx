import React from "react";
import H3 from "../../atoms/h3.atom";
import type { contentProps } from "../../../interfaces/contentProps";

const FormFooter: React.FC<contentProps> = ({ title, children }) => {
  return (
    <footer className="flex flex-col items-center justify-center my-10">
      <H3 text={title} />
      {children}
    </footer>
  );
};

export default FormFooter;
