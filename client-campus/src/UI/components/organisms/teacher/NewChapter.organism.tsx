import { BsFillPostcardFill } from "react-icons/bs";
import ChapterCard from "../../molecules/cards/chapterCard.molecule";
import type { chapterCard } from "../../../interfaces/chapterCard";

const NewChapter:React.FC<chapterCard> = ({ title, text, chapterOrder }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 p-2 bg-lightPrimary dark:bg-darkPrimary border-2 border-lightBorder dark:border-darkBorder rounded">
      <ChapterCard title={title} text={text} order={chapterOrder} icon={<BsFillPostcardFill />} />
    </div>
  );
};

export default NewChapter;
