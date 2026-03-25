import FormInput from "../../../molecules/formInput.molecule";
import { useForm } from "../../../../../hooks/UseForm.hook";
import Button from "../../../atoms/button.atom";
import { validateNewSubject } from "../../../../../BR/domain/services/validators/newSubject.validator";
import type { createSubjectFormData } from "../../../../interfaces/createSubjectFormData";
import { FaCheck } from "react-icons/fa";
import FormSelect from "../../../molecules/formSelect.molecule";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/UseStore.hook";
import Spinner from "../../../molecules/spinner.molecule";
import { useEffect, useState } from "react";
import { fetchGrades } from "../../../../../store/slices/gradeSlice/grade.thunk";
import { createSubject } from "../../../../../store/slices/subjectSlice/subject.thunk";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import Ptxt from "../../../atoms/P.atom";

const initialState: createSubjectFormData = {
  name: "",
  id_grade: "",
};

const CreateSubjectForm = () => {
  const appDispatch = useAppDispatch();
  const [created, setCreated] = useState(false);
  const { items, loading, error } = useAppSelector((state) => state.grades);
  const grades = items.map((grade) => ({
    id: grade.id_grade,
    name: grade.name,
  }));
  useEffect(() => {
    appDispatch(fetchGrades());
  }, [appDispatch]);

  const { values, errors, handleChange, handleSubmit } =
    useForm<createSubjectFormData>(initialState, validateNewSubject);

  const onSubmit = (data: createSubjectFormData) => {
    console.log("Formulario válido:", data);
    appDispatch(createSubject(data));
    setCreated(true);
    setTimeout(() => {
      appDispatch(toggleModal());
      setCreated(false);
    }, 4000);
  };
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  const inputBaseStyles =
    "w-full px-3 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary " +
    "text-lightText dark:text-darkText border border-lightBorder " +
    "dark:border-darkBorder focus:outline-none focus:ring-2 " +
    "focus:ring-lightAccent dark:focus:ring-darkAccent";

  const errorTextStyles =
    "mt-1 text-sm text-lightWarning dark:text-darkWarning";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-lightSecondary dark:bg-darkSecondary p-8 rounded-md shadow-md border border-lightBorder dark:border-darkBorder"
    >
      <FormInput
        label="Nombre de la materia"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.name}
        errorTextStyles={errorTextStyles}
      />

      <FormSelect
        label={"año de la materia"}
        name="id_grade"
        value={values.id_grade}
        handleChange={handleChange}
        items={grades}
        error={errors.id_grade}
        errorTextStyles={errorTextStyles}
      />

      <Button
        btnName="Crear"
        type="submit"
        bgLight="bg-lightDetail"
        bgDark="dark:bg-darkDetail"
        icon={<FaCheck />}
      />
      <div className="w-full justify-center items-center"></div>
      {created && <Ptxt text={`Materia creada exitosamente`} />}
    </form>
  );
};

export default CreateSubjectForm;
