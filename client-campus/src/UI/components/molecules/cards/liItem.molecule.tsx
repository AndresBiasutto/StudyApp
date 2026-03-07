
import Ptxt from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";
import type { liItemProps } from "../../../interfaces/liItemProps";
import { NavLink } from "react-router-dom";

const LiItem: React.FC<liItemProps> = ({ index, item }) => {
  return (
    <li
      className={`w-full
        ${index % 2 === 0 ? "bg-transparent" : "bg-lightBorder dark:bg-darkBorder"}`}
    >
      <NavLink to={item.id ?? "-"} className={` grid grid-cols-12 items-center gap-2 p-2`}>
        <div className="col-span-1 border-r">
          <img
            src={
              item.image ||
              "https://img.planetafobal.com/2022/12/afa-logos-tres-estrellas-mundiales-qa.jpg"
            }
            className="w-8 h-8 rounded-full"
          />
        </div>

        <div className="col-span-7 border-r">
          <Ptxt text={item.name} />
        </div>

        <div className="col-span-3">
          <Span text={item.Role ? item.Role: item.Grade } />
        </div>

        <div className="col-span-1 flex justify-end">

        </div>
      </NavLink>
    </li>
  );
};

export default LiItem;
