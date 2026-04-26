import type { SettingsFormData } from "../../../../UI/interfaces/settingsForm";

export const validateSettings = (
  data: SettingsFormData,
): Partial<SettingsFormData> => {
  const errors: Partial<SettingsFormData> = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!data.last_name.trim()) {
    errors.last_name = "El apellido es obligatorio";
  }

  if (
    data.contact_number.trim() &&
    !/^[0-9+\-()\s]{6,20}$/.test(data.contact_number.trim())
  ) {
    errors.contact_number = "Ingresá un teléfono válido";
  }

  if (data.description.trim().length > 280) {
    errors.description = "La descripción no puede superar los 280 caracteres";
  }

  return errors;
};
