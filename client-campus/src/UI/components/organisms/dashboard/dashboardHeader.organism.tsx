import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RiMenuFold4Fill } from "react-icons/ri";

import image from "../../../../assets/monopc.svg";
import { useAppSelector } from "../../../../hooks/UseStore.hook";
import { toggleSettingsMenu, toggleSidebar } from "../../../../store/slices/uiSlice";
import ButtonRounded from "../../atoms/buttonRounded.atom";
import Ptxt from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {}, [selected]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="fixed z-20 flex w-full items-center justify-between border-b border-lightBorder bg-lightSecondary px-6 py-2 transition-all dark:border-darkBorder dark:bg-darkSecondary">
      <ButtonRounded
        btnName="mostrar menu"
        action={() => dispatch(toggleSidebar())}
        icon={<RiMenuFold4Fill />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
      <div className="flex w-auto flex-row items-center justify-end gap-2">
        <div className="flex w-auto items-center justify-center gap-1">
          <Span text={`${selected?.Role?.name}:`} />
          <Ptxt text={`${selected?.name} ${selected?.last_name}`} />
        </div>
        {selected?.is_demo_user && (
          <span className="rounded-full border border-lightBorder bg-lightAccent/20 px-3 py-1 text-xs font-pixelify text-lightText dark:border-darkBorder dark:bg-darkAccent/20 dark:text-darkText">
            modo demo
          </span>
        )}
        <button
          className="group transition-all duration-200 hover:scale-110 hover:border-lightText dark:hover:border-darkText"
          onClick={() => dispatch(toggleSettingsMenu())}
        >
          <img
            src={selected?.image || image}
            alt="avatar"
            className="h-12 w-12 cursor-pointer rounded-full border border-lightBorder dark:border-darkBorder md:h-8 md:w-8"
          />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
