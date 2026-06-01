import Content from "../../components/molecules/content.molecule";
import Notifications from "../../components/organisms/common/notifications.organism";
import StudentSubjects from "../../components/organisms/student/studentSubjects.organism";

const StudentHome = () => {
  return (
    <Content title="Home">
      <Notifications />
      <StudentSubjects />
    </Content>
  );
};

export default StudentHome;
