import { SiBookstack } from "react-icons/si";
import Button from "../../atoms/button.atom";
import { BsFillPostcardFill } from "react-icons/bs";
import type { creatorCard } from "../../../interfaces/creatorCard";
import UnitCardHeader from "../../molecules/cards/unitCardHeader";
import NewChapter from "../teacher/NewChapter.organism";
import ButtonRounded from "../../atoms/buttonRounded.atom";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { useState } from "react";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import { useDispatch } from "react-redux";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";

const NewUnit: React.FC<creatorCard> = ({
  id,
  title,
  text,
  unitOrder,
  chapters,
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleCreateChapter = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "CREATE_CHAPTER",
        data: { id_unit: id },
        title: `Nuevo capitulo`,
      }),
    );
  };
  const handleEditUnit = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "EDIT_UNIT",
        data: {
          id_unit: id,
          name: title,
          description: text,
          unitOrder: unitOrder,
        },
        title: `Editar ${title}`,
      }),
    );
  };
  const handleDeleteUnit = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "DELETE_UNIT",
        data: { id_unit: id },
        title: `Eliminar ${title}`,
      }),
    );
  };
  return (
    <div className="w-full flex flex-col justify-start items-end gap-2 p-2 bg-lightSecondary dark:bg-darkSecondary rounded">
      <div className="w-full flex items-start justify-between">
        <UnitCardHeader
          id=""
          title={title}
          text={text}
          order={unitOrder}
          icon={<SiBookstack />}
        />
        <div className="flex gap-2">
          <ButtonSquare
            btnName="editar unidad"
            action={handleEditUnit}
            icon={<FaRegEdit />}
            bgLight="bg-lightLink"
            bgDark="dark:bg-darkLink"
          />
          <ButtonSquare
            btnName="eliminar unidad"
            action={handleDeleteUnit}
            icon={<FaRegTrashAlt />}
            bgLight="bg-lightWarning"
            bgDark="dark:bg-darkWarning"
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <ButtonRounded
          btnName={show ? "ver menos" : "ver más"}
          action={() => setShow(!show)}
          icon={show ? <FaChevronUp /> : <FaChevronDown />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      </div>
      {show ? (
        <div className="w-full flex flex-col items-start justify-start gap-4 p-2">
          {chapters
            ? chapters.map((chap) => (
                <NewChapter
                  key={chap.id_chapter}
                  id={chap.id_chapter}
                  title={chap.name}
                  text={chap.description ?? ""}
                  chapterOrder={chap.order ?? chap.chapterOrder}
                />
              ))
            : []}
          <Button
            btnName="nuevo capítulo"
            action={handleCreateChapter}
            icon={<BsFillPostcardFill />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewUnit;
