import { useState } from "react";
import { useDispatch } from "react-redux";
import { BsFillPostcardFill } from "react-icons/bs";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { SiBookstack } from "react-icons/si";

import { useAppSelector } from "../../../../hooks/UseStore.hook";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";
import type { creatorCard } from "../../../interfaces/creatorCard";
import Button from "../../atoms/button.atom";
import ButtonRounded from "../../atoms/buttonRounded.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import UnitCardHeader from "../../molecules/cards/unitCardHeader";
import NewChapter from "./NewChapter.organism";

const NewUnit: React.FC<creatorCard> = ({
  id,
  title,
  text,
  unitOrder,
  chapters,
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const isDemoUser = useAppSelector((state) => state.auth.selected?.is_demo_user);

  const handleCreateChapter = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "CREATE_CHAPTER",
        data: { id_unit: id },
        title: "Nuevo capitulo",
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
          unitOrder,
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
    <div className="flex w-full flex-col items-end justify-start gap-2 rounded bg-lightSecondary p-2 dark:bg-darkSecondary">
      <div className="flex w-full items-start justify-between">
        <UnitCardHeader
          id=""
          title={title}
          text={text}
          order={unitOrder}
          icon={<SiBookstack />}
        />
        {!isDemoUser && (
          <div className="flex gap-2">
            <ButtonSquare
              btnName="editar unidad"
              action={handleEditUnit}
              icon={<FaRegEdit />}
              bgLight="bg-lightAccent"
              bgDark="dark:bg-darkAccent"
            />
            <ButtonSquare
              btnName="eliminar unidad"
              action={handleDeleteUnit}
              icon={<FaRegTrashAlt />}
              bgLight="bg-lightAccent"
              bgDark="dark:bg-darkAccent"
            />
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-center">
        <ButtonRounded
          btnName={show ? "ver menos" : "ver mas"}
          action={() => setShow(!show)}
          icon={show ? <FaChevronUp /> : <FaChevronDown />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      </div>
      {show ? (
        <div className="flex w-full flex-col items-start justify-start gap-4 p-2">
          {chapters
            ? chapters.map((chap) => (
                <NewChapter
                  key={chap.id_chapter}
                  id={chap.id_chapter}
                  title={chap.name}
                  text={chap.description ?? ""}
                  chapterOrder={chap.order ?? chap.order}
                />
              ))
            : []}
          <Button
            btnName="nuevo capitulo"
            action={handleCreateChapter}
            icon={<BsFillPostcardFill />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
          />
        </div>
      ) : null}
    </div>
  );
};

export default NewUnit;
