import { useAppSelector } from "../../../../hooks/UseStore.hook";
import type { RootState } from "../../../../store/store";
import type { Chapter } from "../../../../BR/domain/entities/chapter.interface";
import type { Subject } from "../../../../BR/domain/entities/subject.interface";
import type { Unit } from "../../../../BR/domain/entities/unit.interface";
import type { User } from "../../../../BR/domain/entities/user.interface";
import Modal from "../dashboard/modal.organism";
import CreateSubjectForm from "../forms/adminForms/createSubjectForm.organism";
import DeleteSubjectForm from "../forms/adminForms/deleteSubjectForm.organism";
import DeleteUserForm from "../forms/adminForms/deleteUserForm.organism";
import SetStudentsForm from "../forms/adminForms/setStudentsForm.organism";
import SetTeacherForm from "../forms/adminForms/setTeacherForm.organism";
import UpdateSubjectForm from "../forms/adminForms/updateSubjectForm.organism";
import UpdateUserRoleForm from "../forms/adminForms/updateUserRoleForm.organism";
import CreateChapterForm from "../forms/teacherForms/createChapterForm.organism";
import CreateUnitForm from "../forms/teacherForms/createUnitForm.organism";
import DeleteChapterForm from "../forms/teacherForms/deleteChapterForm.organism";
import DeleteUnitForm from "../forms/teacherForms/deleteUnitForm.organism";
import EditChapterForm from "../forms/teacherForms/editChapterForm.organism";
import EditUnitForm from "../forms/teacherForms/editUnitForm.organism";
import TeacherExamForm from "../teacher/teacherExamForm.organism";


const FormInModal = () => {
  const { modalContent } = useAppSelector((state: RootState) => state.ui);
  const assignStudentsKey =
    modalContent.type === "ASSIGN_STUDENTS" &&
    modalContent.data &&
    typeof modalContent.data === "object" &&
    "id_subject" in modalContent.data
      ? String(modalContent.data.id_subject)
      : "assign-students";

  const form = (() => {
    switch (modalContent.type) {
      case "CREATE_SUBJECT":
        return <CreateSubjectForm />;
      case "CREATE_UNIT":
        return <CreateUnitForm />;
      case "EDIT_UNIT":
        return <EditUnitForm item={modalContent.data as Unit | null} />;
      case "DELETE_UNIT":
        return <DeleteUnitForm item={modalContent.data as Unit | null} />;
      case "CREATE_CHAPTER":
        return <CreateChapterForm item={modalContent.data as Unit | null} />;
      case "EDIT_SUBJECT":
        return <UpdateSubjectForm item={modalContent.data as Subject | null} />;
      case "EDIT_CHAPTER":
        return <EditChapterForm item={modalContent.data as Chapter | null} />;
      case "UPDATE_USER_ROLE":
        return <UpdateUserRoleForm />;
      case "DELETE_USER":
        return <DeleteUserForm item={modalContent.data as User | null} />;
      case "DELETE_SUBJECT":
        return <DeleteSubjectForm item={modalContent.data as Subject | null} />;
      case "DELETE_CHAPTER":
        return <DeleteChapterForm item={modalContent.data as Chapter | null} />;
      case "ASSIGN_TEACHER":
        return <SetTeacherForm item={modalContent.data as Subject | null} />;
      case "ASSIGN_STUDENTS":
        return (
          <SetStudentsForm
            key={assignStudentsKey}
            item={modalContent.data as Subject | null}
          />
        );
      case "TEACHER_EXAM":
        return <TeacherExamForm item={modalContent.data as Chapter | null} />;
      default:
        return null;
    }
  })();
  return (
    <div>
      <Modal text={modalContent?.title}>{form}</Modal>
    </div>
  );
};

export default FormInModal;
