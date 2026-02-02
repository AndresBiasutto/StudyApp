import Content from "../components/molecules/content.molecule";
import NewSubject from "../components/organisms/creator/newSubject.organism";
import { useState } from "react";
import NotSubjectInCreation from "../components/organisms/creator/notSubjectInCreation";

const CreatorDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [IsOnEdit, setIsOnEdit] = useState(false);

  return (
    <Content title="">
      {IsOnEdit ? <NewSubject /> : <NotSubjectInCreation />}
    </Content>
  );
};

export default CreatorDashboard;
