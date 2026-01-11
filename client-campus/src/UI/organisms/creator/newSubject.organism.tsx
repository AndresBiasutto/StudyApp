import { subjectInProgress } from "../../../Data";
import Button from "../../atoms/button.atom";
import { useDispatch } from "react-redux";
import imagen from "../../../assets/monopc.svg";
import SubjectCardHeader from "../../molecules/cards/subjectCardHeader.molecule";
import { SiBookstack } from "react-icons/si";
import NewUnit from "./newUnit.organism";
import Modal from "../modal.organism";
import { toggleModal } from "../../../redux/store/slices/uiSlice";
import RegisterForm from "../forms/registerForm.organism";

const NewSubject = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col justify-start items-end rounded border border-lightBorder dark:border-darkBorder p-4 gap-4">
      <SubjectCardHeader
        title={subjectInProgress.name}
        text={subjectInProgress.description}
        image={imagen}
      />
      <div className="w-full flex flex-col justify-start items-end gap-4">
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
          action={() => dispatch(toggleModal())}
          icon={<SiBookstack />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
        <Modal text="Crear nueva materia" >
          <RegisterForm />
        </Modal>
      </div>
    </div>
  );
};

export default NewSubject;
