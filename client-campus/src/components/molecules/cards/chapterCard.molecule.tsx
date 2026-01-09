import H3 from "../../atoms/h3.atom";
import type { creatorCardHeader } from "../../../interfaces/creatorCardHeader";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ButtonSquare from "../../atoms/buttonSquare.atom";

const chapterCard: React.FC<creatorCardHeader> = ({ title, order, icon }) => {
  return (
    <div className="w-full flex flex-row justify-start items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center border rounded border-darkBorder dark:border-lightBorder">
        <i className="font-pixelify text-center items-center text-lightText dark:text-darkText">
          {icon}
        </i>
      </div>
      <div className=" w-full flex flex-col justify-end items-center gap-2">
        <div className="w-full flex items-center justify-between">
          <H3 text={`CAPÍTULO ${order}: ${title}.`} />
          <div className="flex gap-2">
            <ButtonSquare
              btnName="editar capitulo"
              action={() => alert("editar")}
              icon={<FaRegEdit />}
              bgLight="bg-lightLink"
              bgDark="dark:bg-darkLink"
            />
            <ButtonSquare
              btnName="eliminar capitulo"
              action={() => alert("borrar")}
              icon={<FaRegTrashAlt />}
              bgLight="bg-lightWarning"
              bgDark="dark:bg-darkWarning"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default chapterCard;
