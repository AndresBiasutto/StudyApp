import Content from "../components/molecules/content.molecule";
import NewSubject from "../components/organisms/creator/newSubject.organism";
import { useAppDispatch, useAppSelector } from "../../hooks/UseStore.hook";
import { useEffect, useState } from "react";
import { fetchSubjects } from "../../store/slices/subjectSlice/subject.thunk";
import NotSubjectInCreation from "../components/organisms/creator/notSubjectInCreation";

const CreatorDashboard = () => {
  const appDispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.subjects);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [IsOnEdit, setIsOnEdit] = useState(false);
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
      </ul>
      {IsOnEdit ? <NewSubject /> : <NotSubjectInCreation />}
    </Content>
  );
};

export default CreatorDashboard;
