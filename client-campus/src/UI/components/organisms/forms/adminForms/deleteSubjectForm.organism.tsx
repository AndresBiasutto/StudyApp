import { FaUserXmark } from "react-icons/fa6";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../../../hooks/UseStore.hook";
import { useState } from "react";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import { deleteSubject } from "../../../../../store/slices/subjectSlice/subject.thunk";
import type { Subject } from "../../../../../BR/domain/entities/subject.interface";

interface DeleteSubjectFormProps {
  item: Subject | null;
}

const DeleteSubjectForm = ({ item }: DeleteSubjectFormProps) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleConfirmDelete = async () => {
    if (!item?.id_subject) return;
    try {
      await appDispatch(deleteSubject(item.id_subject)).unwrap();
      setDeleteSuccess(true);
      setTimeout(() => {
        dispatch(toggleModal());
        setDeleteSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error eliminando materia::", error);
    }
  };

  return (
    <div>
      <Ptxt
        aditionalStyle="text-lightWarning dark:text-darkWarning"
        text={`¿Estás seguro de que deseas eliminar "${item?.name}"? Esta acción no se puede deshacer.`} />
      <Button
        btnName={"Eliminar Materia"}
        icon={<FaUserXmark />}
        bgLight="bg-lightWarning"
        bgDark="dark:bg-darkWarning"
        action={handleConfirmDelete}
      />
      {deleteSuccess && (
        <Ptxt
          aditionalStyle=" bg-darkWarning dark:bg-lightWarning rounded p-1"
          text={`Materia "${item?.name}" eliminada exitosamente.`}
        />
      )}
    </div>
  );
};

export default DeleteSubjectForm;
