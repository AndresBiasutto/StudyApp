import { toggleSidebar } from "../../../../store/slices/uiSlice";
import ButtonRounded from "../../atoms/buttonRounded.atom";
import { useDispatch } from "react-redux";
import image from "../../../../assets/monopc.svg";
import { toggleSettingsMenu } from "../../../../store/slices/uiSlice";
import { useAppSelector } from "../../../../hooks/UseStore.hook";
import { useEffect } from "react";
import Ptxt from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";
import { RiMenuFold4Fill } from "react-icons/ri";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.auth);
  useEffect(() => {}, [selected]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="fixed py-2 px-6 transition-all w-full flex items-center justify-between bg-lightSecondary dark:bg-darkSecondary border-b border-lightBorder dark:border-darkBorder z-20">
      <ButtonRounded
        btnName="mostrar menu"
        action={() => dispatch(toggleSidebar())}
        icon={<RiMenuFold4Fill />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
      <div className="w-auto flex flex-row justify-end items-center gap-2">
        <div className="w-auto flex justify-center items-center gap-1 ">
          <Span text={`${selected?.Role?.name}:`} />
          <Ptxt text={`${selected?.name} ${selected?.last_name}`} />
        </div>
        <button
          className="group hover:scale-110 hover:border-lightText dark:hover:border-darkText transition-all duration-200"
          onClick={() => dispatch(toggleSettingsMenu())}
        >
          <img
            src={selected?.image || image}
            alt="avatar"
            className="md:w-8 w-12 md:h-8 h-12 rounded-full cursor-pointer border border-lightBorder dark:border-darkBorder"
          />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
