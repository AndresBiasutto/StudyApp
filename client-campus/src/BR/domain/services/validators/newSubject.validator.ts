import type { createSubjectFormData } from "../../../../UI/interfaces/createSubjectFormData";


export const validateNewSubject = (
  data: createSubjectFormData
): Partial<createSubjectFormData> => {
  const errors: Partial<createSubjectFormData> = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }
  if (!data.id_grade.trim()) {
    errors.id_grade = "el año es obligatorio";
  }
  return errors;
};
