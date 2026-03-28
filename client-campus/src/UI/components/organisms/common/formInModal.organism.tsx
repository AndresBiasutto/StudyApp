import { useAppSelector } from "../../../../hooks/UseStore.hook";
import type { RootState } from "../../../../store/store";
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


const FormInModal = () => {
  const { modalContent } = useAppSelector((state: RootState) => state.ui);
  const form = (() => {
    switch (modalContent.type) {
      case "CREATE_SUBJECT":
        return <CreateSubjectForm />;
      case "CREATE_UNIT":
        return <CreateUnitForm />;
      case "EDIT_UNIT":
        return <EditUnitForm item={modalContent?.data} />;
      case "DELETE_UNIT":
        return <DeleteUnitForm item={modalContent?.data} />;
      case "CREATE_CHAPTER":
        return <CreateChapterForm item={modalContent?.data} />;
      case "EDIT_SUBJECT":
        return <UpdateSubjectForm item={modalContent?.data} />;
      case "EDIT_CHAPTER":
        return <EditChapterForm item={modalContent?.data} />;
      case "UPDATE_USER_ROLE":
        return <UpdateUserRoleForm />;
      case "DELETE_USER":
        return <DeleteUserForm item={modalContent?.data} />;
      case "DELETE_SUBJECT":
        return <DeleteSubjectForm item={modalContent?.data} />;
      case "DELETE_CHAPTER":
        return <DeleteChapterForm item={modalContent?.data} />;
      case "ASSIGN_TEACHER":
        return <SetTeacherForm item={modalContent?.data} />;
      case "ASSIGN_STUDENTS":
        return <SetStudentsForm item={modalContent?.data} />;
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
