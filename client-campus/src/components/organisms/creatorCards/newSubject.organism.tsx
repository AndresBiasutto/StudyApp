import { FaBook } from "react-icons/fa";
import { subjectInProgress } from "../../../Data";
import Button from "../../atoms/button.atom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../redux/store/slices/uiSlice";
import imagen from "../../../assets/monopc.svg";
import SubjectCardHeader from "../../molecules/cards/subjectCardHeader.molecule";
import { SiBookstack } from "react-icons/si";
import NewUnit from "./newUnit.organism";

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
        <SubjectCardHeader
          title={subjectInProgress.name}
          text={subjectInProgress.description}
          image={imagen}
        />
        <div className="w-full flex flex-col justify-start items-end gap-2">
          {subjectInProgress.units.map((unit) => (
            <NewUnit
              title={unit.name}
              text={unit.shortDescription}
              unitOrder={unit.unitOrder}
              chapters={unit.chapters}
            />
          ))}
          <Button
            btnName="nueva unidad"
            action={() => dispatch(toggleSidebar())}
            icon={<SiBookstack />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
          />
        </div>
      </div>
    </>
  );
};

export default NewSubject;
