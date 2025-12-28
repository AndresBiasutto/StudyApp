import { SiBookstack } from "react-icons/si";
// import ChapterCard from "./chapterCard.molecule";
import Button from "../../atoms/button.atom";
import { BsFillPostcardFill } from "react-icons/bs";
import UnitCard from "./unitCard.molecule";

const SubjectCard = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-start items-center gap-2 p-2 bg-lightPrimary dark:bg-darkPrimary rounded">
        <div className=" flex flex-row justify-start items-start gap-2">
          <UnitCard title="title" text="text text text" unitOrder={1} />
        </div>
        <Button
          btnName="nuevo capítulo"
          action={() => alert("crear capitulo")}
          icon={<BsFillPostcardFill />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      </div>
      <Button
        btnName="nueva unidad"
        action={() => () => alert("crear nueva unidad")}
        icon={<SiBookstack />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
    </>
  );
};

export default SubjectCard;
