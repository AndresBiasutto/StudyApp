import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { PiUsersFourBold } from "react-icons/pi";

import type { Subject } from "../../../../BR/domain/entities/subject.interface";
import { useAppSelector } from "../../../../hooks/UseStore.hook";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";
import Button from "../../atoms/button.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";

interface SubjectUlProps {
  item: Subject;
}

const SubjectUl: React.FC<SubjectUlProps> = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDemoUser = useAppSelector((state) => state.auth.selected?.is_demo_user);

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
        title: `Editar: ${item.name}, ${item?.Grade?.name}`,
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

  const handleManageContent = () => {
    navigate(`/dashboard/teacher/subject/${item.id_subject}`);
  };

  return (
    <li className="w-full flex-col items-center justify-start gap-2 rounded bg-lightDetail p-2 dark:bg-darkDetail">
      {!isDemoUser && (
        <div className="flex w-full items-center justify-end gap-2">
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
      )}
      <div className="flex items-end justify-start gap-2">
        <div className="flex w-1/2 flex-col items-start justify-end gap-2 rounded">
          <Ptxt text={item.Grade?.name || "sin ano"} />
          <H3 text={item.name} />
          {isDemoUser ? (
            <Button
              btnName={"gestionar contenido"}
              bgLight="bg-lightAccent"
              bgDark="dark:bg-darkAccent"
              icon={<PiUsersFourBold />}
              action={handleManageContent}
            />
          ) : (
            <Button
              btnName={"asignar estudiantes"}
              bgLight="bg-lightAccent"
              bgDark="dark:bg-darkAccent"
              icon={<PiUsersFourBold />}
              action={handleAssignStudents}
            />
          )}
        </div>
        <div className="flex w-1/2 flex-col items-end justify-end gap-2">
          <Ptxt text={item?.creator?.name || "no hay un profesor asignado"} />
          {!isDemoUser && (
            <Button
              btnName={"asignar Profesor"}
              bgLight="bg-lightAccent"
              bgDark="dark:bg-darkAccent"
              icon={<LiaChalkboardTeacherSolid />}
              action={handleAssignProfessor}
            />
          )}
        </div>
      </div>
      {isDemoUser && (
        <Ptxt
          text="En modo demo solo se permite crear contenido nuevo."
          aditionalStyle="mt-2 text-sm"
        />
      )}
    </li>
  );
};

export default SubjectUl;
