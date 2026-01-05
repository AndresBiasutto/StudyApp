import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import ButtonRounded from "../atoms/buttonRounded.atom";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { useDispatch } from "react-redux";
import image from "../../assets/monopc.svg"

const DashboardHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="fixed py-2 px-6 transition-all w-full flex items-center justify-between bg-lightSecondary dark:bg-darkSecondary border-b border-lightBorder dark:border-darkBorder z-50">
      <ButtonRounded
        btnName="mostrar menu"
        action={() => dispatch(toggleSidebar())}
        icon={<BsLayoutTextSidebarReverse />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
      <button className="group hover:scale-105 transition-all duration-200">
        <img src={image} alt="avatar" className="group-hover:bg-lightBorder transition-all duration-200 w-8 h-8 rounded-full border border-lightBorder dark:border-darkBorder"/>
      </button>
    </div>
  );
};

export default DashboardHeader;
