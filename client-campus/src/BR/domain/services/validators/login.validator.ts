import type { LoginFormData } from "../../../../UI/interfaces/loginForm";

export const validateLogin = (
  data: LoginFormData,
): Partial<LoginFormData> => {
  const errors: Partial<LoginFormData> = {};

  if (!data.e_mail.trim()) {
    errors.e_mail = "El e-mail es obligatorio";
  } else if (!/^\S+@\S+\.\S+$/.test(data.e_mail)) {
    errors.e_mail = "El e-mail no es valido";
  }

  if (!data.password) {
    errors.password = "La contrasena es obligatoria";
  }

  return errors;
};
