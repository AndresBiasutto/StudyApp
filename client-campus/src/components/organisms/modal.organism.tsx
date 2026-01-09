import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { toggleModal } from "../../redux/store/slices/uiSlice";
import { useEffect } from "react";
import CloseBackground from "../commons/closeBackground.common";
import ButtonSquare from "../atoms/buttonSquare.atom";
import { IoClose } from "react-icons/io5";
import H2 from "../atoms/h2.atom";
import type { modal } from "../../interfaces/modal";

const Modal: React.FC<modal> = ({ text, children }) => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state: RootState) => state.ui);
  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  return (
    <>
      <CloseBackground
        isOpen={modalOpen}
        action={() => dispatch(toggleModal())}
      />
      <div
        className={`max-h-4/5 h-full w-full md:w-auto max-w-5xl fixed p-2 z-50 inset-y-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded overflow-hidden border border-lightBorder dark:border-darkBorder overflow-y-auto bg-lightPrimary dark:bg-darkPrimary transform transition duration-300  ${
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
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default Modal;
