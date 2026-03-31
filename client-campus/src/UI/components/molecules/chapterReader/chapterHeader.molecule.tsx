import React from "react";
import type { textProps } from "../../../interfaces/textProps";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";

const ChapterHeader: React.FC<textProps> = ({ text, text2, text3 }) => {
  return (
    <header className="space-y-2 border-b border-lightBorder dark:border-darkBorder pb-4">
        <Ptxt text={text2} />
        <H3 text={text} />
        <Ptxt text={text3} />
    </header>
  );
};

export default ChapterHeader;
