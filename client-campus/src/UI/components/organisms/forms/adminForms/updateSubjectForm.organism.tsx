import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/UseStore.hook";
import { updateSubject } from "../../../../../store/slices/subjectSlice/subject.thunk";
import FormSelect from "../../../molecules/formSelect.molecule";
import { CiEdit } from "react-icons/ci";
import { fetchGrades } from "../../../../../store/slices/gradeSlice/grade.thunk";
import type { Subject } from "../../../../../BR/domain/entities/subject.interface";
import { useEffect, useState } from "react";
import { useForm } from "../../../../../hooks/UseForm.hook";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import Spinner from "../../../molecules/spinner.molecule";
import Button from "../../../atoms/button.atom";
import FormInput from "../../../molecules/formInput.molecule";
import Ptxt from "../../../atoms/P.atom";

interface UpdateSubjectFormValues {
  name: string;
  id_grade: string;
  [key: string]: string;
}

interface UpdateSubjectFormProps {
  item: Subject | null;
}

const initialState: UpdateSubjectFormValues = {
  name: "",
  id_grade: "",
};

const validate = (data: UpdateSubjectFormValues) => {
  const errors: Partial<Record<keyof UpdateSubjectFormValues, string>> = {};

  if (!data.name) {
    errors.name = "Debe ingresar un nombre";
  }

  if (!data.id_grade) {
    errors.id_grade = "Debe seleccionar un año";
  }

  return errors;
};

const UpdateSubjectForm: React.FC<UpdateSubjectFormProps> = ({ item }) => {
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const { items: gradesState } = useAppSelector((state) => state.grades);
  const {
    items: subjects,
    loading,
    error,
  } = useAppSelector((state) => state.subjects);

  const grades = gradesState.map((grade) => ({
    id: grade.id_grade,
    name: grade.name,
  }));

  const { values, errors, handleChange, handleSubmit } =
    useForm<UpdateSubjectFormValues>(initialState, validate);

  useEffect(() => {
    if (gradesState.length === 0) dispatch(fetchGrades());
  }, [dispatch, subjects.length, gradesState.length]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

const onSubmit = async (data: UpdateSubjectFormValues) => {

  const result = await dispatch(
    updateSubject({
      id: item?.id_subject || "",
      data,
    })
  );

  if (updateSubject.fulfilled.match(result)) {
    setUpdateSuccess(true);

    setTimeout(() => {
      dispatch(toggleModal());
      setUpdateSuccess(false);
    }, 1500);
  }
};

  const inputBaseStyles =
    "w-full px-3 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary " +
    "text-lightText dark:text-darkText border border-lightBorder " +
    "dark:border-darkBorder focus:outline-none focus:ring-2 " +
    "focus:ring-lightAccent dark:focus:ring-darkAccent";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-lightSecondary dark:bg-darkSecondary p-6 rounded-md border border-lightBorder dark:border-darkBorder"
    >
      <FormInput
        label={`Nombre actual: ${item?.name}`}
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        className={inputBaseStyles}
      />

      <FormSelect
        label="Cambiar año de la materia"
        name="id_grade"
        value={values.id_grade}
        handleChange={handleChange}
        items={grades}
        error={errors.id_grade}
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

export default UpdateSubjectForm;
