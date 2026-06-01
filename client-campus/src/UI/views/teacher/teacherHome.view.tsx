import Content from "../../components/molecules/content.molecule";
import Notifications from "../../components/organisms/common/notifications.organism";
import TeacherAssignedSubjects from "../../components/organisms/teacher/teacherAssignedSubjects.organism";

const TeacherHome = () => {
  return (
    <Content title="Home">
      <Notifications />
      <TeacherAssignedSubjects />
    </Content>
  );
};

export default TeacherHome;
