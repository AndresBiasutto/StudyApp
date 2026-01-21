import React from "react";
import type { contentProps } from "../../interfaces/contentProps";
import H3 from "../atoms/h3.atom";

const Section: React.FC<contentProps> = ({ title, children }) => {
  return (
    <section className="flex flex-col items-center justify-center my-10">
      <H3 text={title} />
      {children}
    </section>
  );
};

export default Section;
