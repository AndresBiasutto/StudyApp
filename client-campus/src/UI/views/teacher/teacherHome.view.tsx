import Content from "../../components/molecules/content.molecule";
import TeacherAssignedSubjects from "../../components/organisms/teacher/teacherAssignedSubjects.organism";
import TeacherTools from "../../components/organisms/teacher/teacherTools.organism";

const TeacherHome = () => {
  return (
    <Content title="Teacher Home HOUSE!">
      <TeacherTools />
      <TeacherAssignedSubjects />
    </Content>
  );
};

export default TeacherHome;
