import { BsFillPostcardFill } from "react-icons/bs";
import ChapterCard from "../../molecules/cards/chapterCard.molecule";
import type { chapterCard } from "../../../interfaces/chapterCard";
import { NavLink } from "react-router-dom";

const NewChapter:React.FC<chapterCard> = ({id, title, text, chapterOrder }) => {
  return (
    <NavLink to={`/dashboard/teacher/chapter/${id}`} className="w-full flex flex-col justify-start items-start gap-2 p-2 bg-lightPrimary dark:bg-darkPrimary border-2 border-lightBorder dark:border-darkBorder rounded">
      <ChapterCard id={id} title={title} text={text} order={chapterOrder} icon={<BsFillPostcardFill />} />
    </NavLink>
  );
};

export default NewChapter;
