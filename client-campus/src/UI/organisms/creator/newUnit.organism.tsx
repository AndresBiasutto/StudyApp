import { SiBookstack } from "react-icons/si";
import Button from "../../atoms/button.atom";
import { BsFillPostcardFill } from "react-icons/bs";
import type { creatorCard } from "../../../interfaces/creatorCard";
import UnitCardHeader from "../../molecules/cards/UnitCardHeader";
import NewChapter from "./NewChapter.organism";
import ButtonRounded from "../../atoms/buttonRounded.atom";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { useState } from "react";
import ButtonSquare from "../../atoms/buttonSquare.atom";

const NewUnit: React.FC<creatorCard> = ({
  title,
  text,
  unitOrder,
  createChapter,
  chapters,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full flex flex-col justify-start items-end gap-2 p-2 bg-lightSecondary dark:bg-darkSecondary rounded">
      <div className="w-full flex items-start justify-between">
        <UnitCardHeader
          title={title}
          text={text}
          order={unitOrder}
          icon={<SiBookstack />}
        />
        <div className="flex gap-2">
          <ButtonSquare
            btnName="editar unidad"
            action={() => alert("editar")}
            icon={<FaRegEdit />}
            bgLight="bg-lightLink"
            bgDark="dark:bg-darkLink"
          />
          <ButtonSquare
            btnName="eliminar materia"
            action={() => alert("borrar")}
            icon={<FaRegTrashAlt />}
            bgLight="bg-lightWarning"
            bgDark="dark:bg-darkWarning"
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <ButtonRounded
          btnName="nuevo capítulo"
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
                  key={chap.id}
                  id={chap.id}
                  title={chap.name}
                  text={chap.description}
                  chapterOrder={chap.chapterOrder}
                />
              ))
            : []}
          <Button
            btnName="nuevo capítulo"
            action={createChapter}
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
