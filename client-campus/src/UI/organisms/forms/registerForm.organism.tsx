// src/components/organisms/forms/registerForm.organism.tsx

import FormInput from "../../molecules/formInput.molecule";
import Button from "../../atoms/button.atom";

import { useForm } from "../../../hooks/UseForm";
import { validateRegister } from "../../../validators/register.validator";
import type { RegisterFormData } from "../../../interfaces/registerForm";

const initialState: RegisterFormData = {
  firstName: "",
  lastName: "",
  e_mail: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm<RegisterFormData>(initialState, validateRegister);

  const onSubmit = (data: RegisterFormData) => {
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
      className="w-full max-w-sm bg-lightSecondary dark:bg-darkSecondary p-8 rounded-md shadow-md border border-lightBorder dark:border-darkBorder"
    >
      <FormInput
        label="Nombre"
        name="firstName"
        type="text"
        value={values.firstName}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.firstName}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="Apellido"
        name="lastName"
        type="text"
        value={values.lastName}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.lastName}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="E-mail"
        name="e_mail"
        type="email"
        value={values.e_mail}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.e_mail}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.password}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="Confirmar password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.confirmPassword}
        errorTextStyles={errorTextStyles}
      />

      <Button btnName="Registrar" type="submit" />
    </form>
  );
};

export default RegisterForm;
