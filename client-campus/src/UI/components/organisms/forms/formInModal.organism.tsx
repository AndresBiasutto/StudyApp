import { useAppSelector } from "../../../../hooks/UseStore.hook";
import type { RootState } from "../../../../store/store";
import Modal from "../dashboard/modal.organism";
import CreateSubjectForm from "./adminForms/createSubjectForm.organism";
import DeleteSubjectForm from "./adminForms/deleteSubjectForm.organism";
import DeleteUserForm from "./adminForms/deleteUserForm.organism";
import SetTeacherForm from "./adminForms/setTeacherForm.organism";
import UpdateSubjectForm from "./adminForms/updateSubjectForm.organism";
import UpdateUserRoleForm from "./adminForms/updateUserRoleForm.organism";
import CreateUnitForm from "./teacherForms/createUnitForm.organism";

const FormInModal = () => {
  const { modalContent } = useAppSelector((state: RootState) => state.ui);
  const form = (() => {
    switch (modalContent.type) {
      case "CREATE_SUBJECT":
        return <CreateSubjectForm />;
      case "CREATE_UNIT":
        return <CreateUnitForm />;
      case "EDIT_SUBJECT":
        return <UpdateSubjectForm item={modalContent?.data} />;
      case "EDIT_CHAPTER":
        return <UpdateSubjectForm item={modalContent?.data} />;
      case "UPDATE_USER_ROLE":
        return <UpdateUserRoleForm />;
      case "DELETE_USER":
        return <DeleteUserForm item={modalContent?.data} />;
      case "DELETE_SUBJECT":
        return <DeleteSubjectForm item={modalContent?.data} />;
      case "DELETE_CHAPTER":
        return <DeleteSubjectForm item={modalContent?.data} />;
      case "ASSIGN_TEACHER":
        return <SetTeacherForm item={modalContent?.data} />;
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
