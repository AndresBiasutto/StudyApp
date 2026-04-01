import React from "react";
import type { textProps } from "../../../interfaces/textProps";

const ChapterArticle: React.FC<textProps> = ({ text }) => {
  return (
    <article className="bg-lightPrimary dark:bg-darkPrimary border border-lightBorder dark:border-darkBorder rounded-lg p-6 space-y-4">
      <div dangerouslySetInnerHTML={{ __html: text ?? "" }} />
    </article>
  );
};

export default ChapterArticle;
