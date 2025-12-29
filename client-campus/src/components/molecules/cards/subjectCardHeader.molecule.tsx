import type { subjectCardHeader } from "../../../types/subjectCardHeader";
import H3 from "../../atoms/h3.atom";
import Image from "../../atoms/image.atom";
import Ptxt from "../../atoms/P.atom";

const SubjectCardHeader: React.FC<subjectCardHeader> = ({ title, text, image}) => {
  return (
    <div className="w-full h-32 flex justify-start items-start gap-2 ">
      <div className="w-32 h-32 border rounded border-darkBorder dark:border-lightBorder">
        <Image src={image} alt="nada" />
      </div>
      <div className="w-full h-28 overflow-y-scroll flex flex-col justify-start items-start gap-2">
        <H3 text={title} />
        <Ptxt text={text} />
      </div>
    </div>
  );
};

export default SubjectCardHeader;
