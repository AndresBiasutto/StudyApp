import Content from "../../components/molecules/content.molecule";
import Calendar from "../../components/organisms/common/calendar.organism";
import TeacherAssignedSubjects from "../../components/organisms/teacher/teacherAssignedSubjects.organism";

const TeacherHome = () => {
  return (
    <Content title="Mis Materias">
      <TeacherAssignedSubjects />
      <Calendar />
    </Content>
  );
};

export default TeacherHome;
