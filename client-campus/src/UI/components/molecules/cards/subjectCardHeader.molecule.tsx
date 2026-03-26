import type { subjectCardHeader } from "../../../interfaces/subjectCardHeader";
import H3 from "../../atoms/h3.atom";
import Image from "../../atoms/image.atom";
import Ptxt from "../../atoms/P.atom";

const SubjectCardHeader: React.FC<subjectCardHeader> = ({
  title,
  text,
  image,
}) => {
  return (
    <div className="w-full h-32 flex justify-start items-start gap-2 ">
      <div className=" min-h-16 min-w-16 h-16 w-16   md:w-32 md:h-32 border rounded border-darkBorder dark:border-lightBorder">
        <Image src={image} alt="nada" />
      </div>
      <div className="w-full flex flex-col justify-end items-start gap-2">
        <div className="w-full flex items-center justify-start">
          <H3 text={title} />
        </div>
        <div className="w-full h-16 overflow-y-scroll flex flex-col justify-start items-start gap-2">
          <Ptxt text={text} />
        </div>
      </div>
    </div>
  );
};

export default SubjectCardHeader;
