import type { subjectCardHeader } from "../../../interfaces/subjectCardHeader";
import H2 from "../../atoms/h2.atom";
import Ptxt from "../../atoms/P.atom";

const SubjectCardHeader: React.FC<subjectCardHeader> = ({
  title,
  text,
}) => {
  return (
    <div className="w-full flex justify-start items-start gap-2 ">

      <div className="w-full flex flex-col justify-end items-start gap-2">
        <div className="w-full flex items-center justify-start">
          <H2 text={title} />
        </div>
        <div className="w-full overflow-y-scroll flex flex-col justify-start items-start gap-2">
          <Ptxt text={text} />
        </div>
      </div>
    </div>
  );
};

export default SubjectCardHeader;
