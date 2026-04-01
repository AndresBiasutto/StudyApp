import { useForm } from "../../../../../hooks/UseForm.hook";
import type { LoginFormData } from "../../../../interfaces/loginForm";
import Button from "../../../atoms/button.atom";
import FormInput from "../../../molecules/formInput.molecule";

const initialState: LoginFormData = {
  e_mail: "",
  password: "",
};

const LoginForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm<LoginFormData>(
    initialState,
    () => ({})
  );

  const onSubmit = (data: LoginFormData) => {
    console.log("login data", data);
    // dispatch login thunk
  };

  const inputBaseStyles =
    "w-full px-3 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary " +
    "text-lightText dark:text-darkText border border-lightBorder " +
    "dark:border-darkBorder focus:outline-none focus:ring-2 " +
    "focus:ring-lightAccent dark:focus:ring-darkAccent";

  const errorTextStyles = "mt-1 text-sm text-lightWarning dark:text-darkWarning";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm bg-lightSecondary dark:bg-darkSecondary p-8 rounded-md shadow-md border border-lightBorder dark:border-darkBorder"
    >
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

      <Button btnName="Login" type="submit" />
    </form>
  );
};

export default LoginForm;
