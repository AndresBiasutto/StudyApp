// src/validators/register.validator.ts
import type { RegisterFormData } from "../types/registerForm";

export const validateRegister = (
  data: RegisterFormData
): Partial<RegisterFormData> => {
  const errors: Partial<RegisterFormData> = {};

  if (!data.firstName.trim()) {
    errors.firstName = "El nombre es obligatorio";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "El apellido es obligatorio";
  }

  if (!data.e_mail.trim()) {
    errors.e_mail = "El e-mail es obligatorio";
  } else if (!/^\S+@\S+\.\S+$/.test(data.e_mail)) {
    errors.e_mail = "El e-mail no es válido";
  }

  if (!data.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (data.password.length < 6) {
    errors.password = "Debe tener al menos 6 caracteres";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirmá la contraseña";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};
