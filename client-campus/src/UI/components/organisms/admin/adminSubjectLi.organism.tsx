import { MdDeleteOutline } from "react-icons/md";
import type { Subject } from "../../../../BR/domain/entities/subject.interface";
import Button from "../../atoms/button.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";
import { MdModeEdit } from "react-icons/md";
import { PiUsersFourBold } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

interface SubjectLiProps {
  item: Subject;
}

const SubjectLi: React.FC<SubjectLiProps> = ({ item }) => {
  return (
    <li className="w-full flex-col justify-start items-center gap-2 rounded bg-lightDetail dark:bg-darkDetail p-2">
      <div className="w-full flex justify-end items-center gap-2">
        <ButtonSquare
          btnName={"editar materia"}
          bgLight="bg-lightLink"
          bgDark="dark:bg-darkLink"
          icon={<MdModeEdit />}
        />
        <ButtonSquare
          btnName={"eliminar materia"}
          bgLight="bg-lightWarning"
          bgDark="dark:bg-darkWarning"
          icon={<MdDeleteOutline />}
        />
      </div>
      <div className="flex justify-start items-end gap-2">
        <div className="w-1/2 flex flex-col justify-end items-start gap-2 rounded">
          <Ptxt text={item.Grade?.name || "sin año"} />
          <H3 text={item.name} />
          <Button
            btnName={"asignar estudiantes"}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
            icon={<PiUsersFourBold />}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-end items-end gap-2">
          <Ptxt text={item?.creator?.name || "no hay un profesor asignado"} />
          <Button
            btnName={"asignar Profesor"}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
            icon={<LiaChalkboardTeacherSolid />}
          />
        </div>
      </div>
    </li>
  );
};

export default SubjectLi;
