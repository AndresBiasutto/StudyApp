import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";
import type { creatorCardHeader } from "../../../types/creatorCardHeader";

const CreatorCardHeader: React.FC<creatorCardHeader> = ({
  title,
  text,
  order,
  icon,
}) => {
  return (
    <div className="w-full flex flex-row justify-start items-start gap-2">
      <div className="w-10 h-10 flex items-center justify-center border rounded border-darkBorder dark:border-lightBorder">
        <i className="font-pixelify text-center items-center text-lightText dark:text-darkText">
          {icon}
        </i>
      </div>
      <div className="w-full overflow-y-scroll flex flex-col justify-start items-start gap-2">
        <H3 text={`UNIDAD ${order}: ${title}.`} />
        <Ptxt text={text} />
      </div>
    </div>
  );
};

export default CreatorCardHeader;
