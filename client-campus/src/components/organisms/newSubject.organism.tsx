import { FaBook } from "react-icons/fa";
import { subjectInProgress } from "../../Data";
import Button from "../atoms/button.atom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import imagen from "../../assets/monopc.svg";
import UnitCards from "./unitCards.organism";
import SubjectCardHeader from "../molecules/cards/subjectCardHeader.molecule";

const NewSubject = () => {
  const dispatch = useDispatch();

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
        <SubjectCardHeader title={subjectInProgress.name} text={subjectInProgress.description} image={imagen} />
        <UnitCards units={subjectInProgress.units} />
      </div>
    </>
  );
};

export default NewSubject;
