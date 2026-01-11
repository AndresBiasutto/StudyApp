import { useDispatch } from "react-redux";
import Content from "../UI/molecules/content.molecule";
import Button from "../UI/atoms/button.atom";
import { toggleSidebar } from "../redux/store/slices/uiSlice";
import { FaBook } from "react-icons/fa";
import NewSubject from "../UI/organisms/creator/newSubject.organism";

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