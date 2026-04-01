import Content from "../../components/molecules/content.molecule";
import TeacherAssignedSubjects from "../../components/organisms/teacher/teacherAssignedSubjects.organism";

const TeacherHome = () => {
  return (
    <Content title="Mis Materias">
      <TeacherAssignedSubjects />
    </Content>
  );
};

export default TeacherHome;
