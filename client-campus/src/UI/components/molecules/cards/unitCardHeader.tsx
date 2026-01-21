import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";
import type { creatorCardHeader } from "../../../interfaces/creatorCardHeader";
import Icon from "../../atoms/icon.atom";

const UnitCardHeader: React.FC<creatorCardHeader> = ({
  title,
  text,
  order,
  icon,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <div className="w-8 h-8 flex items-center justify-center border rounded border-darkBorder dark:border-lightBorder">
          <Icon icon={icon} />
        </div>
        <div className="w-full flex items-start justify-between">
          <H3 text={`UNIDAD ${order}: ${title}.`} />
        </div>
      </div>
      <div className="w-full overflow-y-scroll flex flex-col justify-start items-start gap-2">
        <Ptxt text={text} />
      </div>
    </div>
  );
};

export default UnitCardHeader;
