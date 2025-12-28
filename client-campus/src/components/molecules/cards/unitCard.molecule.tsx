import { SiBookstack } from "react-icons/si";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";
import Button from "../../atoms/button.atom";
import { BsFillPostcardFill } from "react-icons/bs";
import type { creatorCard } from "../../../types/creatorCard";
import ChapterCards from "../../organisms/chapterCards.organism";

const UnitCard: React.FC<creatorCard> = ({title, text, unitOrder, createChapter, chapters}) => {
  return (
    <div className="w-full flex flex-col justify-start items-end gap-2 p-2 bg-lightBorder dark:bg-darkBorder rounded">
      <div className="w-full flex flex-row justify-start items-start gap-2">
        <div className="w-10 h-10 flex items-center justify-center border rounded border-darkBorder dark:border-lightBorder">
          <i className="font-pixelify text-center items-center text-lightText dark:text-darkText">
            <SiBookstack />
          </i>
        </div>
        <div className="w-full overflow-y-scroll flex flex-col justify-start items-start gap-2">
          <H3 text={`UNIDAD ${unitOrder}: ${title}.`} />
          <Ptxt text={text} />
        </div>
      </div>
      <ChapterCards chapters={chapters } />
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

export default UnitCard;
