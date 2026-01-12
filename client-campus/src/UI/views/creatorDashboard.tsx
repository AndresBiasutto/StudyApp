import { useDispatch } from "react-redux";
import Content from "../molecules/content.molecule";
import Button from "../atoms/button.atom";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import { FaBook } from "react-icons/fa";
import NewSubject from "../organisms/creator/newSubject.organism";

const CreatorDashboard = () => {
  const dispatch = useDispatch();
  return (
    <Content title="">
      <Button
        btnName="nueva materia"
        action={() => dispatch(toggleSidebar())}
        icon={<FaBook />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
      <NewSubject />
    </Content>
  );
}

export default CreatorDashboard