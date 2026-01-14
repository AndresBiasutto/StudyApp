import { useDispatch } from "react-redux";
import Content from "../molecules/content.molecule";
import Button from "../atoms/button.atom";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import { FaBook } from "react-icons/fa";
import NewSubject from "../organisms/creator/newSubject.organism";
import { useAppDispatch, useAppSelector } from "../../redux/store/store.hooks";
import { useEffect } from "react";
import { fetchSubjects } from "../../redux/store/slices/subject/subject.thunk";

const CreatorDashboard = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.subjects);
  useEffect(() => {
    appDispatch(fetchSubjects());
  }, [appDispatch]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Content title="">
      <ul>
        {items.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
        {
          
        }
      </ul>
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
};

export default CreatorDashboard;
