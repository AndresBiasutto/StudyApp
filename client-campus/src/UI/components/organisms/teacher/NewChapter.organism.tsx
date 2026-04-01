import { BsFillPostcardFill } from "react-icons/bs";
import type { chapterCard } from "../../../interfaces/chapterCard";
import { NavLink } from "react-router-dom";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";
import type { Chapter } from "../../../../BR/domain/entities/chapter.interface";
import { useDispatch } from "react-redux";
import H3 from "../../atoms/h3.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const NewChapter: React.FC<chapterCard> = ({
  id,
  title,
  text,
  chapterOrder,
}) => {
  const dispatch = useDispatch();
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
    <div className="  w-full flex flex-row justify-between items-center gap-2 p-2 border rounded border-darkBorder dark:border-lightBorder bg-lightPrimary dark:bg-darkPrimary">
      <NavLink to={`/dashboard/teacher/chapter/${id}`} className="group w-full flex items-center justify-center gap-2">
        <i className=" font-pixelify text-center text-2xl group-hover:scale-105 text-lightText dark:text-darkText">
          <BsFillPostcardFill />
        </i>
        <div className="w-full flex items-center justify-start">
          <H3 text={`CAPÍTULO ${chapterOrder}: ${title}.`} />
        </div>
      </NavLink>
      <div className=" w-auto flex flex-col justify-end items-center gap-2">
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
    </div>
  );
};

export default NewChapter;
