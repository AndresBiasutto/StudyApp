import { BsFillPostcardFill } from "react-icons/bs";
import type { chapterCard } from "../../../types/chapters";
import CreatorCardHeader from "../../molecules/cards/creatorCardHeader.molecule";

const NewChapter:React.FC<chapterCard> = ({ title, text, chapterOrder }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 p-2 bg-lightSecondary dark:bg-darkSecondary rounded">
      <CreatorCardHeader title={title} text={text} order={chapterOrder} icon={<BsFillPostcardFill />} />
    </div>
  );
};

export default NewChapter;
