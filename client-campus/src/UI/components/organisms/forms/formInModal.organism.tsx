import { useAppSelector } from "../../../../hooks/UseStore.hook";
import type { RootState } from "../../../../store/store";
import Modal from "../dashboard/modal.organism";
import CreateSubjectForm from "./adminForms/createSubjectForm.organism";
import DeleteSubjectForm from "./adminForms/deleteSubjectForm.organism";
import DeleteUserForm from "./adminForms/deleteUserForm.organism";
import SetTeacherForm from "./adminForms/setTeacherForm.organism";
import UpdateSubjectForm from "./adminForms/updateSubjectForm.organism";
import UpdateUserRoleForm from "./adminForms/updateUserRoleForm.organism";

const FormInModal = () => {
  const { modalContent } = useAppSelector((state: RootState) => state.ui);
  const form = (() => {
    switch (modalContent.type) {
      case "DELETE_SUBJECT":
        return <DeleteSubjectForm item={modalContent?.data} />;
      case "CREATE_SUBJECT":
        return <CreateSubjectForm />;
      case "EDIT_SUBJECT":
        return <UpdateSubjectForm item={modalContent?.data} />;
      case "UPDATE_USER_ROLE":
        return <UpdateUserRoleForm />;
      case "DELETE_USER":
        return <DeleteUserForm item={modalContent?.data} />;
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
