import { useDispatch } from "react-redux";
import Content from "./content.template";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import ButtonRounded from "../atoms/buttonRounded.atom";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import CourseCards from "../organisms/courseCards.organism";

const UserDashboard = () => {
  const dispatch = useDispatch();
  return (
    <Content title="">
      <div className="w-full flex justify-start items-center">
        <ButtonRounded
          btnName="mostrar menu"
          action={() => dispatch(toggleSidebar())}
          icon={<BsLayoutTextSidebarReverse />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      </div>
      <CourseCards />
    </Content>
  );
};

export default UserDashboard;
