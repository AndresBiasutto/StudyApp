import Content from "../../components/molecules/content.molecule";
import StudentSubjects from "../../components/organisms/student/studentSubjects.organism";

const StudentHome = () => {
  return (
    <Content title="Home">
      <StudentSubjects />
    </Content>
  );
};

export default StudentHome;
