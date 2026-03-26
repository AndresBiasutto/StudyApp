import { FaUserXmark } from "react-icons/fa6";
import type { Unit } from "../../../../../BR/domain/entities/unit.interface";
import { useAppDispatch } from "../../../../../hooks/UseStore.hook";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSubjectById } from "../../../../../store/slices/subjectSlice/subject.thunk";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import { deleteUnit } from "../../../../../store/slices/unitSlice/unit.thunk";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";

interface DeleteUnitFormProps {
  item: Unit | null;
}

const DeleteUnitForm: React.FC<DeleteUnitFormProps> = ({ item }) => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const [deleted, setDeleted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!item?.id_unit) {
      setSubmitError("No se encontro la unidad a eliminar");
      return;
    }

    try {
      setSubmitError(null);
      await dispatch(deleteUnit(item.id_unit)).unwrap();

      if (id_subject) {
        await dispatch(fetchSubjectById(id_subject));
      }

      setDeleted(true);
      setTimeout(() => {
        dispatch(toggleModal());
        setDeleted(false);
      }, 1500);
    } catch (error) {
      setSubmitError("No se pudo eliminar la unidad");
      console.error("Error eliminando unidad:", error);
    }
  };

  return (
    <div>
      <Ptxt
        aditionalStyle="text-lightWarning dark:text-darkWarning"
        text={`Estas seguro de que deseas eliminar "${item?.name}"? Esta accion no se puede deshacer.`}
      />
      <Button
        btnName="Eliminar Unidad"
        icon={<FaUserXmark />}
        bgLight="bg-lightWarning"
        bgDark="dark:bg-darkWarning"
        action={handleConfirmDelete}
      />

      {submitError && (
        <Ptxt
          text={submitError}
          aditionalStyle="mt-4 text-lightWarning dark:text-darkWarning"
        />
      )}

      {deleted && (
        <Ptxt
          text={`Unidad "${item?.name}" eliminada exitosamente.`}
          aditionalStyle="bg-darkWarning dark:bg-lightWarning rounded p-1"
        />
      )}
    </div>
  );
};

export default DeleteUnitForm;
