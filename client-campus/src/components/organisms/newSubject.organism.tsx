import { FaBook } from "react-icons/fa";
import { subjectInProgress } from "../../Data";
import Button from "../atoms/button.atom";
import Image from "../atoms/image.atom";
import H3 from "../atoms/h3.atom";
import Ptxt from "../atoms/P.atom";
// import { SiBookstack } from "react-icons/si";
// import ChapterCard from "../molecules/cards/chapterCard.molecule";
// import { BsFillPostcardFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import imagen from "../../assets/monopc.svg";
import UnitCards from "./unitCards.organism";
import { SiBookstack } from "react-icons/si";

const NewSubject = () => {
  const dispatch = useDispatch();
  const subject= subjectInProgress;
  return (
    <>
      <Button
        btnName="nueva materia"
        action={() => dispatch(toggleSidebar())}
        icon={<FaBook />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
      <div className="w-full flex flex-col justify-start items-end rounded bg-lightSecondary dark:bg-darkSecondary p-2 gap-2">
        <div className="w-full h-32 flex justify-start items-start gap-2 ">
          <div className="w-32 h-32 border rounded border-darkBorder dark:border-lightBorder">
            <Image src={imagen} alt="nada" />
          </div>
          <div className="w-full h-28 overflow-y-scroll flex flex-col justify-start items-start gap-2">
            <H3 text={subject.name} />
            <Ptxt text={subject.description} />
          </div>
        </div>
        <UnitCards units={subject.units} />

        <Button
          btnName="nueva unidad"
          action={() => dispatch(toggleSidebar())}
          icon={<SiBookstack />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      </div>
    </>
  );
};

export default NewSubject;
