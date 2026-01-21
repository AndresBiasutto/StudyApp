import { FaRegEdit, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import type { subjectCardHeader } from "../../../interfaces/subjectCardHeader";
import H3 from "../../atoms/h3.atom";
import Image from "../../atoms/image.atom";
import Ptxt from "../../atoms/P.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";

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
      <div className="flex flex-col justify-end items-start gap-2">
        <div className="w-full flex items-start justify-between">
          <H3 text={title} />
          <div className="flex gap-2">
            <ButtonSquare
              btnName="editar materia"
              action={() => alert("editar")}
              icon={<FaRegEdit />}
              bgLight="bg-lightLink"
              bgDark="dark:bg-darkLink"
            />
            <ButtonSquare
              btnName="guardar borrador"
              action={() => alert("guardar")}
              icon={<FaRegSave />}
              bgLight="bg-lightSuccess"
              bgDark="dark:bg-darkSuccess"
            />
            <ButtonSquare
              btnName="eliminar materia"
              action={() => alert("borrar")}
              icon={<FaRegTrashAlt />}
              bgLight="bg-lightWarning"
              bgDark="dark:bg-darkWarning"
            />
          </div>
        </div>
        <div className="w-full h-16 overflow-y-scroll flex flex-col justify-start items-start gap-2">
          <Ptxt text={text} />
        </div>
        <figure className="bg-lightDetail dark:bg-darkDetail border-2 border-lightBorder dark:border-darkBorder rounded-2xl px-4 font-vt323 text-lightText dark:text-darkText">
          estado: en edición
        </figure>
      </div>
    </div>
  );
};

export default SubjectCardHeader;
