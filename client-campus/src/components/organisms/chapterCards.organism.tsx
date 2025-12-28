import {  } from "../../Data";
import type { chapterCards } from "../../types/chapters";
import ChapterCard from "../molecules/cards/chapterCard.molecule";

const ChapterCards: React.FC<chapterCards> = ({ chapters = [] }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
      {chapters.map((chap) => (
        <ChapterCard key={chap.id} {...chap} />
      ))}
    </div>
  );
}

export default ChapterCards