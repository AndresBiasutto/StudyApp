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
    errors.contact_number = "Ingresa un telefono valido";
  }

  if (data.description.trim().length > 280) {
    errors.description = "La descripcion no puede superar los 280 caracteres";
  }

  if (data.image.trim()) {
    try {
      const imageUrl = new URL(data.image.trim());

      if (imageUrl.protocol !== "http:" && imageUrl.protocol !== "https:") {
        errors.image = "La imagen debe usar una URL http o https";
      }
    } catch {
      errors.image = "Ingresa una URL de imagen valida";
    }
  }

  return errors;
};
