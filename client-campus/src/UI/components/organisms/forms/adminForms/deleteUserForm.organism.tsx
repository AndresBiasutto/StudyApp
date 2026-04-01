import { FaUserXmark } from "react-icons/fa6";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";
import { useState } from "react";
import { useAppDispatch } from "../../../../../hooks/UseStore.hook";
import { deleteUser } from "../../../../../store/slices/userSlice/user.thunk";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../../../BR/domain/entities/user.interface";

interface DeleteUserFormProps {
  item: User | null;
}

const DeleteUserForm = ({ item }: DeleteUserFormProps) => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    if (!item?.id_user) return;
    try {
      await appDispatch(deleteUser(item.id_user)).unwrap();
      setDeleteSuccess(true);
      setTimeout(() => {
        dispatch(toggleModal());
        setDeleteSuccess(false);
        navigate("/dashboard/admin/users");
      }, 3000);
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <>
        <Ptxt
          text={`¿Estás seguro que deseas eliminar a ${item?.name} ${item?.last_name}? Esta acción no se puede deshacer.`}
        />
        <Button
          btnName={"Eliminar Usuario"}
          icon={<FaUserXmark />}
          bgLight="bg-lightWarning"
          bgDark="dark:bg-darkWarning"
          action={handleConfirmDelete}
        />
      </>
      {deleteSuccess ?? (
        <Ptxt
          aditionalStyle="bg-darkWarning dark:bg-lightWarning p-1 rounded"
          text="Usuario eliminado correctamente."
        />
      )}
    </div>
  );
};

export default DeleteUserForm;
