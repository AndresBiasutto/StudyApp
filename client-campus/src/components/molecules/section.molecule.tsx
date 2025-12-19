import React from "react";
import type { contentProps } from "../../interfaces/contentProps";
import H3 from "../atoms/h3.atom";

const Section: React.FC<contentProps> = ({ title, children }) => {
  return (
    <main className="flex flex-col items-start justify-center my-10">
      <H3 text={title} />
      {children}
    </main>
  );
};

export default Section;
