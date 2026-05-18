import Button from "../../atoms/button.atom";
import { TfiBlackboard } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { setModalContent, toggleModal } from "../../../../store/slices/uiSlice";
import { useAppSelector } from "../../../../hooks/UseStore.hook";
import Ptxt from "../../atoms/P.atom";

const NewSubject = () => {
  const isDemoUser = useAppSelector(
    (state) => state.auth.selected?.is_demo_user,
  );
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
  const handleDemo = () => {
    alert("las cuentas demo no pueden modificar las materias exitentes");
  };
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      {isDemoUser ? (
        <Button
          btnName="nueva materia"
          action={handleDemo}
          icon={<TfiBlackboard />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      ) : (
        <Button
          btnName="nueva materia"
          action={handleCreateSubject}
          icon={<TfiBlackboard />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      )}
      {isDemoUser && (
        <Ptxt
          text="En modo demo no se puede modificar nada, pero puedes ver cómo funciona la plataforma"
          aditionalStyle="mt-2 text-sm"
        />
      )}
    </div>
  );
};

export default NewSubject;
