import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import type { Chapter } from "../../../../BR/domain/entities/chapter.interface";
import { useAppSelector } from "../../../../hooks/UseStore.hook";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";
import type { chapterCard } from "../../../interfaces/chapterCard";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import H3 from "../../atoms/h3.atom";

const NewChapter: React.FC<chapterCard> = ({
  id,
  title,
  text,
  chapterOrder,
}) => {
  const dispatch = useDispatch();
  const isDemoUser = useAppSelector((state) => state.auth.selected?.is_demo_user);
  const chapterData: Partial<Chapter> = {
    id_chapter: id,
    name: title || "",
    order: chapterOrder,
    description: text,
  };

  const handleEditChapter = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "EDIT_CHAPTER",
        data: chapterData,
        title: `Editar ${title}`,
      }),
    );
  };

  const handleDeleteChapter = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "DELETE_CHAPTER",
        data: chapterData,
        title: `Eliminar ${title}`,
      }),
    );
  };

  return (
    <div className="flex w-full flex-row items-center justify-between gap-2 rounded border border-darkBorder bg-lightPrimary p-2 dark:border-lightBorder dark:bg-darkPrimary">
      <NavLink
        to={`/dashboard/teacher/chapter/${id}`}
        className="group flex w-full items-center justify-center gap-2"
      >
        <i className="text-center font-pixelify text-2xl text-lightText group-hover:scale-105 dark:text-darkText">
          <BsFillPostcardFill />
        </i>
        <div className="flex w-full items-center justify-start">
          <H3 text={`CAPITULO ${chapterOrder}: ${title}.`} />
        </div>
      </NavLink>
      {!isDemoUser && (
        <div className="flex w-auto flex-col items-center justify-end gap-2">
          <div className="flex gap-2">
            <ButtonSquare
              btnName="editar capitulo"
              action={handleEditChapter}
              icon={<FaRegEdit />}
              bgLight="bg-lightAccent"
              bgDark="dark:bg-darkAccent"
            />
            <ButtonSquare
              btnName="eliminar capitulo"
              action={handleDeleteChapter}
              icon={<FaRegTrashAlt />}
              bgLight="bg-lightAccent"
              bgDark="dark:bg-darkAccent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewChapter;
