import type React from "react";
import EditorCard from "../../../atoms/editorCard.atom";
import H2 from "../../../atoms/h2.atom";
import Ptxt from "../../../atoms/P.atom";

interface ChapterBasicInfoProps {
  chapterDisplayId: string | undefined;
  title: string;
  onTitleChange: (value: string) => void;
  summary: string;
  onSummaryChange: (value: string) => void;
}

const ChapterBasicInfo: React.FC<ChapterBasicInfoProps> = ({
  chapterDisplayId,
  summary,
}) => {
  return (
    <EditorCard>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="w-full">
          <H2 text={`Capitulo ${chapterDisplayId ?? "sin id"}`} />
          <Ptxt aditionalStyle="mt-2" text={summary} />
        </div>
      </div>
      <div className="mt-4"></div>
    </EditorCard>
  );
};

export default ChapterBasicInfo;
