import Button from "../../atoms/button.atom";
import { TfiBlackboard } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";

const NewSubject = () => {
  const dispatch = useDispatch();
  const handleCreateSubject = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "CREATE_SUBJECT",
        data: null,
        title: `crear nueva materia`,
      }),
    );
  };
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <Button
        btnName="nueva materia"
        action={handleCreateSubject}
        icon={<TfiBlackboard />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
    </div>
  );
};

export default NewSubject;
