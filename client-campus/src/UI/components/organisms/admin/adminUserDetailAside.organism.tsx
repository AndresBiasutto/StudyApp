import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import { deleteUser } from "../../../../store/slices/userSlice/user.thunk";
import { toggleModal } from "../../../../store/slices/uiSlice";
import Button from "../../atoms/button.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import H2 from "../../atoms/h2.atom";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";
import Modal from "../common/modal.organism";
import UpdateUserRoleForm from "../forms/adminForms/updateUserRoleForm.organism";

const AdminUserDetailAside = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [modalType, setModalType] = useState<"delete" | "updateRole" | null>(
    null,
  );
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { selected } = useAppSelector((state) => state.users);
  const isDemoUser = useAppSelector((state) => state.auth.selected?.is_demo_user);

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

  return (
    <div className="flex w-full flex-col items-center justify-start gap-4 rounded border border-lightBorder p-2 dark:border-darkBorder md:h-screen md:w-64">
      <img className="h-32 w-32 rounded-full" src={selected?.image ?? undefined} />
      <H2 text={`${selected?.name} ${selected?.last_name}`} />
      <div className="flex items-center justify-start gap-2">
        <H3 text={`${selected?.Role?.name ?? "-"}`} />
        {!isDemoUser && (
          <ButtonSquare
            btnName={"cambiar Rol"}
            icon={<FaRegEdit />}
            action={handleUpdateRole}
            bgLight="bg-lightDetail"
            bgDark="dark:bg-darkDetail"
          />
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-start">
        <div className="flex w-full flex-col items-start justify-center overflow-clip py-2">
          <Span text={"E-mail:"} />
          <Ptxt text={`${selected?.e_mail}`} />
        </div>
        <div className="flex w-full flex-col items-start justify-center overflow-clip py-2">
          <Span text={"contacto:"} />
          <Ptxt text={`${selected?.contact_number}`} />
        </div>
      </div>
      {isDemoUser ? (
        <Ptxt text="La cuenta demo admin solo puede consultar usuarios." />
      ) : (
        <Button
          btnName={"Eliminar Usuario"}
          icon={<FaUserXmark />}
          bgLight="bg-lightWarning"
          bgDark="dark:bg-darkWarning"
          action={handleDeleteUser}
        />
      )}
      {modalType && (
        <Modal text={selectedModalTitle}>
          {modalType === "delete" && (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              {!deleteSuccess ? (
                <>
                  <Ptxt
                    text={`Estas seguro que deseas eliminar a ${selected?.name} ${selected?.last_name}?`}
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
