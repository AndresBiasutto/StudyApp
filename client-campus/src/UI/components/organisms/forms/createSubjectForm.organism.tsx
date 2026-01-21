import FormInput from "../../molecules/formInput.molecule";
import { useForm } from "../../../../hooks/UseForm.hook";
import Button from "../../atoms/button.atom";
import { validateNewSubject } from "../../../../BR/domain/services/validators/newSubject.validator";
import type { createSubjectFormData } from "../../../interfaces/createSubjectFormData";
import { FaCheck } from "react-icons/fa";

const initialState: createSubjectFormData = {
  id: "",
  name: "",
  description: "",
  subjectState: "pending",
};

const CreateSubjectForm = () => {
  const { values, errors, handleChange, handleSubmit } =
    useForm<createSubjectFormData>(initialState, validateNewSubject);

  const onSubmit = (data: createSubjectFormData) => {
    console.log("Formulario válido:", data);
    // llamada a servicio / API
  };

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
      className="w-full bg-lightSecondary   dark:bg-darkSecondary p-8 rounded-md shadow-md border border-lightBorder dark:border-darkBorder"
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

      <FormInput
        label="Descripción"
        name="description"
        type="text"
        value={values.description}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.description}
        errorTextStyles={errorTextStyles}
      />
      <Button
        btnName="Crear"
        type="submit"
        bgLight="bg-lightDetail"
        bgDark="dark:bg-darkDetail"
        icon={<FaCheck />}
      />
    </form>
  );
};

export default CreateSubjectForm;
