import { SiBookstack } from "react-icons/si";
import Button from "../../atoms/button.atom";
import { BsFillPostcardFill } from "react-icons/bs";
import type { creatorCard } from "../../../types/creatorCard";
import CreatorCardHeader from "../../molecules/cards/creatorCardHeader.molecule";
import NewChapter from "./NewChapter.organism";

const NewUnit: React.FC<creatorCard> = ({
  title,
  text,
  unitOrder,
  createChapter,
  chapters,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-end gap-2 p-2 bg-lightBorder dark:bg-darkBorder rounded">
      <CreatorCardHeader
        title={title}
        text={text}
        order={unitOrder}
        icon={<SiBookstack />}
      />
      {/* <ChapterCards chapters={chapters} /> */}
      <div className="w-full flex flex-col items-start justify-start gap-2">
        {chapters? chapters.map((chap) => (
          <NewChapter key={chap.id} id={chap.id} title={chap.name} text={chap.description} chapterOrder={chap.chapterOrder} />
        )):[]}
      </div>
      <Button
        btnName="nuevo capítulo"
        action={createChapter}
        // action={() => dispatch(toggleSidebar())}
        icon={<BsFillPostcardFill />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
    </div>
  );
};

export default NewUnit;
