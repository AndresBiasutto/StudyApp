// import type { User } from "../../../../../BR/domain/entities/user.interface";

import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/UseStore.hook";
import { fetchUsers } from "../../../../../store/slices/authSlice/auth.thunk";
import { useForm } from "../../../../../hooks/UseForm.hook";
import Spinner from "../../../molecules/spinner.molecule";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import FormSelect from "../../../molecules/formSelect.molecule";
import Button from "../../../atoms/button.atom";
import { CiEdit } from "react-icons/ci";
import Ptxt from "../../../atoms/P.atom";
import type { Subject } from "../../../../../BR/domain/entities/subject.interface";
import type { User } from "../../../../../BR/domain/entities/user.interface";
import { updateSubject } from "../../../../../store/slices/subjectSlice/subject.thunk";

interface UpdateUserFormValues {
  id_teacher: string;
  id_subject: string;
  [key: string]: string;
}

interface UpdateSubjectFormProps {
  item: Subject | null;
}

const initialState: UpdateUserFormValues = {
  id_teacher: "",
  id_subject: "",
};

const validate = (data: UpdateUserFormValues) => {
  const errors: Partial<Record<keyof UpdateUserFormValues, string>> = {};
  if (!data.id_teacher) {
    errors.id_teacher = "Debe seleccionar un profesor";
  }
  return errors;
};

const SetTeacherForm: React.FC<UpdateSubjectFormProps> = ({ item }) => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const {
    items: userState,
    loading,
    error,
  } = useAppSelector((state) => state.users);

  const users = userState.map((user: User) => ({
    id: user.id_user,
    name: user.name,
  }));

  const { values, errors, handleChange, handleSubmit } =
    useForm<UpdateUserFormValues>(initialState, validate);

  useEffect(() => {
    if (userState.length === 0) dispatch(fetchUsers());
  }, [dispatch, userState.length]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  const onSubmit = async (data: UpdateUserFormValues) => {
    dispatch(
      updateSubject({
        id: item?.id_subject || "",
        data,
      }),
    );
    console.log("datos enviados" ,data);
      setUpdateSuccess(true);
      setTimeout(() => {
        dispatch(toggleModal());
        setUpdateSuccess(false);
      }, 1500);
  };

  //   const inputBaseStyles =
  //     "w-full px-3 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary " +
  //     "text-lightText dark:text-darkText border border-lightBorder " +
  //     "dark:border-darkBorder focus:outline-none focus:ring-2 " +
  //     "focus:ring-lightAccent dark:focus:ring-darkAccent";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-lightSecondary dark:bg-darkSecondary p-6 rounded-md border border-lightBorder dark:border-darkBorder"
    >
      <FormSelect
        label="Asignar profesor"
        name="id_teacher"
        value={values.id_teacher}
        handleChange={handleChange}
        items={users}
        error={errors.id_teacher}
      />

      <Button
        btnName="Terminar edición"
        type="submit"
        bgLight="bg-lightDetail"
        bgDark="dark:bg-darkDetail"
        icon={<CiEdit />}
      />

      {updateSuccess && (
        <div className="mt-4 flex justify-center">
          <Ptxt
            aditionalStyle="bg-lightLink dark:bg-darkLink rounded p-1"
            text="Materia editada exitosamente"
          />
        </div>
      )}
    </form>
  );
};

export default SetTeacherForm;
