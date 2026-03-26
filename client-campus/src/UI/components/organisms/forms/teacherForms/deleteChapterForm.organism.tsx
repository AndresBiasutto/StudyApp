import { FaUserXmark } from "react-icons/fa6";
import type { Chapter } from "../../../../../BR/domain/entities/chapter.interface";
import { useAppDispatch } from "../../../../../hooks/UseStore.hook";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteChapter } from "../../../../../store/slices/chapterSlice/chapter.thunk";
import { fetchSubjectById } from "../../../../../store/slices/subjectSlice/subject.thunk";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";

interface DeleteChapterFormProps {
  item: Chapter | null;
}

const DeleteChapterForm: React.FC<DeleteChapterFormProps> = ({ item }) => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const [deleted, setDeleted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!item?.id_chapter) {
      setSubmitError("No se encontro el capitulo a eliminar");
      return;
    }

    try {
      setSubmitError(null);
      await dispatch(deleteChapter(item.id_chapter)).unwrap();

      if (id_subject) {
        await dispatch(fetchSubjectById(id_subject));
      }

      setDeleted(true);
      setTimeout(() => {
        dispatch(toggleModal());
        setDeleted(false);
      }, 1500);
    } catch (error) {
      setSubmitError("No se pudo eliminar el capitulo");
      console.error("Error eliminando capitulo:", error);
    }
  };

  return (
    <div>
      <Ptxt
        aditionalStyle="text-lightWarning dark:text-darkWarning"
        text={`Estas seguro de que deseas eliminar "${item?.name}"? Esta accion no se puede deshacer.`}
      />
      <Button
        btnName="Eliminar Capitulo"
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
          text={`Capitulo "${item?.name}" eliminado exitosamente.`}
          aditionalStyle="bg-darkWarning dark:bg-lightWarning rounded p-1"
        />
      )}
    </div>
  );
};

export default DeleteChapterForm;
