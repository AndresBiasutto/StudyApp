import type { updateFormDataProps } from "../../../../interfaces/updateRoleFormData";
import Select from "../../../molecules/select.molecule";
import { updateRole } from "../../../../../store/slices/userSlice/user.thunk";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/UseStore.hook";
import { useEffect, useState } from "react";
import { fetchRoles } from "../../../../../store/slices/roleSlice/role.thunk";
import Spinner from "../../../molecules/spinner.molecule";
import { useForm } from "../../../../../hooks/UseForm.hook";
import Button from "../../../atoms/button.atom";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import Ptxt from "../../../atoms/P.atom";

const initialState: updateFormDataProps = {
  id_role: "",
};

const validate = (data: updateFormDataProps) => {
  const errors: Partial<Record<keyof updateFormDataProps, string>> = {};
  if (!data.id_role) {
    errors.id_role = "Debe seleccionar un rol";
  }
  return errors;
};

const UpdateUserRoleForm: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => state.users);
  const [roleUpdate, setRoleUpdate] = useState(false);
  const {
    items: roles,
    loading: loadingRoles,
    error: errorRoles,
  } = useAppSelector((state) => state.roles);

  const { values, errors, handleChange, handleSubmit } =
    useForm<updateFormDataProps>(initialState, validate);

  useEffect(() => {
    if (roles.length === 0) appDispatch(fetchRoles());
  }, [appDispatch, roles, values]);

  if (loadingRoles) return <Spinner />;
  if (errorRoles) return <p>{errorRoles}</p>;

  const onSubmit = (data: updateFormDataProps) => {
    if (!selected) return;
    setRoleUpdate(true);
    appDispatch(
      updateRole({
        id_user: selected.id_user,
        id_role: data.id_role,
      }),
    );
    setTimeout(() => {
      setRoleUpdate(false);
      appDispatch(toggleModal());
    }, 4000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-lightSecondary dark:bg-darkSecondary p-6 rounded-md border border-lightBorder dark:border-darkBorder"
    >
      <Select
        name="id_role"
        items={roles}
        value={values.id_role}
        onChange={
          handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>
        }
      />

      {errors.id_role && (
        <p className="text-sm text-lightWarning dark:text-darkWarning">
          {errors.id_role}
        </p>
      )}

      <Button
        btnName="Actualizar Rol"
        type="submit"
        bgLight="bg-lightDetail"
        bgDark="dark:bg-darkDetail"
      />
      {roleUpdate && (
        <Ptxt text="Rol actualizado" aditionalStyle="bg-lightLink dark:bg-darkLink p-1 rounded" />
      )}
    </form>
  );
};

export default UpdateUserRoleForm;
