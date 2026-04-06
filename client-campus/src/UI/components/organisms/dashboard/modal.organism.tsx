import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { toggleModal } from "../../../../store/slices/uiSlice";
import CloseBackground from "../../molecules/closeBackground.molecule";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import { IoClose } from "react-icons/io5";
import H2 from "../../atoms/h2.atom";
import type { modal } from "../../../interfaces/modal";

const Modal: React.FC<modal> = ({ text, children }) => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state: RootState) => state.ui);

  return (
    <>
      <CloseBackground
        isOpen={modalOpen}
        action={() => dispatch(toggleModal())}
      />
      <div
        className={`fixed min-h-96 max-h-screen w-full md:w-4/5 max-w-5xl p-2 z-50 inset-y-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded overflow-y-scroll border border-lightBorder dark:border-darkBorder bg-lightPrimary dark:bg-darkPrimary transform transition duration-300  ${
          modalOpen ? "" : "hidden"
        }`}
      >
        <div className=" flex justify-between items-center">
          <H2 text={text} />
          <ButtonSquare
            btnName="cerrar"
            action={() => dispatch(toggleModal())}
            icon={<IoClose />}
            bgLight="bg-lightWarning"
            bgDark="dark:bg-darkWarning"
          />
        </div>
        <div className="w-full flex justify-center items-center ">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
