import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { toggleModal } from "../../redux/store/slices/uiSlice";
import { useEffect } from "react";

const Modal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state: RootState) => state.ui);
  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  return (
    <>
      {modalOpen && (
        <div
          onClick={() => dispatch(toggleModal())}
          className="fixed inset-0 z-20 bg-lightSecondary dark:bg-darkSecondary opacity-20 hover:opacity-45 cursor-pointer transition-all duration-200"
        />
      )}
      <div
        className={`fixed z-30 inset-y-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl mx-4 aspect-video rounded-xl overflow-hidden border border-lightBorder dark:border-darkBorder overflow-y-auto bg-lightSecondary dark:bg-darkSecondary transform transition duration-300  ${
          modalOpen ? "" : "hidden"
        }`}
      >
        <button
          onClick={() => dispatch(toggleModal())}
          className="absolute top-2 right-2 z-10 text-lightText dark:text-darkText hover:text-lightWarning dark:hover:text-darkWarning"
        >
          ✕
        </button>
      </div>
    </>
  );
};

export default Modal;
