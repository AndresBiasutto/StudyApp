import H2 from "../../atoms/h2.atom";
import H3 from "../../atoms/h3.atom";
import Span from "../../atoms/span.atom";
import Ptxt from "../../atoms/P.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import { FaRegEdit } from "react-icons/fa";
import Modal from "../common/modal.organism";
import { toggleModal } from "../../../../store/slices/uiSlice";
import { useDispatch } from "react-redux";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/UseStore.hook";
import { useEffect, useState } from "react";
import {
  deleteUser,
  fetchListedUsers,
} from "../../../../store/slices/authSlice/auth.thunk";
import Button from "../../atoms/button.atom";
import { FaUserXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import UpdateUserRoleForm from "../forms/adminForms/updateUserRoleForm.organism";

const AdminUserDetailAside = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [modalType, setModalType] = useState<"delete" | "updateRole" | null>(
    null,
  );
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const handleConfirmDelete = async () => {
    if (!selected?.id_user) return;
    try {
      await appDispatch(deleteUser(selected.id_user)).unwrap();

      setDeleteSuccess(true);

      setTimeout(() => {
        dispatch(toggleModal());
        setModalType(null);
        setDeleteSuccess(false);
        navigate("/dashboard/admin/users");
      }, 2000);
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const handleDeleteUser = () => {
    dispatch(toggleModal());
    setModalType("delete");
  };

  const handleUpdateRole = () => {
    dispatch(toggleModal());
    setModalType("updateRole");
  };

  const selectedModalTitle =
    modalType === "delete"
      ? "Eliminar Usuario"
      : modalType === "updateRole"
        ? "Cambiar Rol"
        : "";
  const { selected } = useAppSelector((state) => state.users);
  useEffect(() => {
    if (selected?.id_role) {
      appDispatch(fetchListedUsers());
    }
  }, [appDispatch, selected?.id_role]);

  return (
    <div className=" w-full md:w-64 md:h-screen p-2 flex flex-col items-center justify-start gap-4 border rounded border-lightBorder dark:border-darkBorder">
      <img className=" w-32 h-32 rounded-full" src={selected?.image} />
      <H2 text={`${selected?.name} ${selected?.last_name}`} />
      <div className="flex justify-start items-center gap-2">
        <H3 text={`${selected?.Role?.name ?? "-"}`} />
        <ButtonSquare
          btnName={"cambiar Rol"}
          icon={<FaRegEdit />}
          action={() => handleUpdateRole()}
          bgLight="bg-lightDetail"
          bgDark="dark:bg-darkDetail"
        />
      </div>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-center items-start overflow-clip py-2">
          <Span text={"E-mail:"} />
          <Ptxt text={`${selected?.e_mail}`} />
        </div>
        <div className="w-full flex flex-col justify-center items-start overflow-clip py-2">
          <Span text={"contacto:"} />
          <Ptxt text={`${selected?.contact_number}`} />
        </div>
      </div>
      <Button
        btnName={"Eliminar Usuario"}
        icon={<FaUserXmark />}
        bgLight="bg-lightWarning"
        bgDark="dark:bg-darkWarning"
        action={() => handleDeleteUser()}
      />
      {modalType && (
        <Modal text={selectedModalTitle}>
          {modalType === "delete" && (
            <div className="w-full flex flex-col justify-center items-center gap-4">
              {!deleteSuccess ? (
                <>
                  <Ptxt
                    text={`¿Estás seguro que deseas eliminar a ${selected?.name} ${selected?.last_name}?`}
                  />
                  <Button
                    btnName={"Eliminar Usuario"}
                    icon={<FaUserXmark />}
                    bgLight="bg-lightWarning"
                    bgDark="dark:bg-darkWarning"
                    action={handleConfirmDelete}
                  />
                </>
              ) : (
                <Ptxt text="Usuario eliminado correctamente." />
              )}
            </div>
          )}

          {modalType === "updateRole" && <UpdateUserRoleForm />}
        </Modal>
      )}
    </div>
  );
};

export default AdminUserDetailAside;
