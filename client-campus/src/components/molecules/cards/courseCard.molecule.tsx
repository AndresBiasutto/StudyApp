import type { cardProps } from "../../../interfaces/cardProps";
import H2 from "../../atoms/h2.atom";
import Image from "../../atoms/image.atom";
import Ptxt from "../../atoms/P.atom";

const CourseCard: React.FC<cardProps> = ({ title, text, image }) => {
  return (
    <div className="shadowDN cursor-pointer flex flex-col items-center justify-start p-1 bg-lightSecondary dark:bg-darkSecondary transition-all rounded-md">
      <div className="max-h-40 overflow-hidden center">
        <Image src={image} alt={title} className="" />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <H2 text={title} />
        <Ptxt text={text} />
      </div>
    </div>
  );
};

export default CourseCard;
