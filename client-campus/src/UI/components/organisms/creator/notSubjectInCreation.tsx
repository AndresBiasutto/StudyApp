import Button from "../../atoms/button.atom";
import { TfiBlackboard } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../../store/slices/uiSlice";
import H2 from "../../atoms/h2.atom";
import Modal from "../modal.organism";
import CreateSubjectForm from "../forms/createSubjectForm.organism";

const NotSubjectInCreation = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-center items-center">
      <H2 text="¿Querés crear una nueva materia?" />
      <Button
        btnName="nueva materia"
        action={() => dispatch(toggleModal())}
        icon={<TfiBlackboard />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
      <Modal text={"Nueva materia"}>
        <CreateSubjectForm />
      </Modal>
    </div>
  );
};

export default NotSubjectInCreation;
