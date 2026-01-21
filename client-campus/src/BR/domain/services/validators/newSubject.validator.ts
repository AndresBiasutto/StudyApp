import type { createSubjectFormData } from "../../../../UI/interfaces/createSubjectFormData";


export const validateNewSubject = (
  data: createSubjectFormData
): Partial<createSubjectFormData> => {
  const errors: Partial<createSubjectFormData> = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!data.description.trim()) {
    errors.description = "La descripción es obligatoria";
  }
  if (!data.subjectState.trim()) {
    errors.subjectState = "el estado es obligatorio";
  }
  return errors;
};
