import React from "react";
import type { textProps } from "../../../interfaces/textProps";
import H3 from "../../atoms/h3.atom";

const ChapterHeader: React.FC<textProps> = ({ text }) => {
  return (
    <header className="space-y-2 border-b border-lightBorder dark:border-darkBorder pb-4">
      <H3 text={text} />
    </header>
  );
};

export default ChapterHeader;
