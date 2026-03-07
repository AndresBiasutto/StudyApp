import Button from "../../atoms/button.atom";
import { TfiBlackboard } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../../store/slices/uiSlice";
import Modal from "../common/modal.organism";
import CreateSubjectForm from "../forms/createSubjectForm.organism";

const NewSubject = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
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

export default NewSubject;
