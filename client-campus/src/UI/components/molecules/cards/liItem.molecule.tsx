import { RiProfileLine } from "react-icons/ri";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import Ptxt from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";
import type { liItemProps } from "../../../interfaces/liItemProps";

const LiItem: React.FC<liItemProps> = ({ index, item }) => {
  return (
    <li
      className={`w-full grid grid-cols-12 justify-start items-center gap-2 p-2 
                ${
                  index % 2 === 0
                    ? "bg-transparent"
                    : "bg-lightBorder dark:bg-darkBorder"
                }`}
    >
      <div className="col-span-1 border-r border-lightText dark:border-darkText">
        <img
          src={item.image}
          alt="avatar"
          className="w-8 h-8 rounded-full border border-lightBorder dark:border-darkBorder"
        />
      </div>
      <div className="col-span-7 border-r border-lightText dark:border-darkText">
        <Ptxt text={`${item.name} ${item.last_name}`} />
      </div>
      <div className="col-span-3">
        <Span text={item.Role.name} />
      </div>
      <div className="col-span-1 flex items-center justify-end">
        <ButtonSquare
          btnName="perfil"
          icon={<RiProfileLine />}
          bgLight="bg-lightSecondary"
          bgDark="dark:bg-darkSecondary"
        />
      </div>
    </li>
  );
};

export default LiItem;
