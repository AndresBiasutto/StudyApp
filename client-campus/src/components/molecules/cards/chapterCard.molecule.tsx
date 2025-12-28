import { BsFillPostcardFill } from "react-icons/bs";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";

const ChapterCard = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 p-2 bg-lightSecondary dark:bg-darkSecondary rounded">
      <div className=" flex flex-row justify-start items-start gap-2">
        <div className="w-6 h-6 flex items-center justify-center border rounded border-darkBorder dark:border-lightBorder">
          <i className="font-pixelify text-center items-center text-lightText dark:text-darkText">
            <BsFillPostcardFill />
          </i>
        </div>
        <div className="w-full overflow-y-scroll flex flex-col justify-start items-start gap-2">
          <H3 text="CAPÍTULO 1 : mi primer capítulo" />
          <Ptxt text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus purus neque, sed pharetra massa lacinia rhoncus. Duis auctor sodales tempor. Aenean vestibulum nulla volutpat, maximus enim et, fermentum " />
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
