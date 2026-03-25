import type { Subject } from "../../../../BR/domain/entities/subject.interface";
import Button from "../../atoms/button.atom";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";
import { PiUsersFourBold } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";

interface SubjectUlProps {
  item: Subject;
}
const SubjectUl: React.FC<SubjectUlProps> = ({ item }) => {
  const dispatch = useDispatch();
  const handleDeleteSubject = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "DELETE_SUBJECT",
        data: item,
        title: `Eliminar ${item.name}`,
      }),
    );
  };
  const handleEditSubject = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "EDIT_SUBJECT",
        data: item,
        title: `Editar: ${item.name},  ${item?.Grade?.name}`,
      }),
    );
  };
  const handleAssignProfessor = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "ASSIGN_TEACHER",
        data: item,
        title: `Asignar un profesor a ${item.name}`,
      }),
    );
  };
  const handleAssignStudents = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "ASSIGN_STUDENTS",
        data: item,
        title: `Asignar estudiantes a ${item.name}`,
      }),
    );
  };

  return (
    <li className="w-full flex-col justify-start items-center gap-2 rounded bg-lightDetail dark:bg-darkDetail p-2">
      <div className="w-full flex justify-end items-center gap-2">
        <ButtonSquare
          btnName={"editar materia"}
          bgLight="bg-lightLink"
          bgDark="dark:bg-darkLink"
          icon={<MdModeEdit />}
          action={handleEditSubject}
        />
        <ButtonSquare
          btnName={"eliminar materia"}
          bgLight="bg-lightWarning"
          bgDark="dark:bg-darkWarning"
          icon={<MdDeleteOutline />}
          action={handleDeleteSubject}
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
            action={handleAssignStudents}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-end items-end gap-2">
          <Ptxt text={item?.creator?.name || "no hay un profesor asignado"} />
          <Button
            btnName={"asignar Profesor"}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
            icon={<LiaChalkboardTeacherSolid />}
            action={handleAssignProfessor}
          />
        </div>
      </div>
    </li>
  );
};

export default SubjectUl;
