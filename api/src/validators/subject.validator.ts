import {
  isArrayOfStrings,
  isString,
  minLength,
} from "../middlewares/validation.middleware";

export const createSubjectSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
    id_grade: { required: true, rules: [isString(), minLength(1)] },
    id_user: { rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    imageUrl: { rules: [isString()] },
  },
};

export const subjectIdParamSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateSubjectSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    name: { rules: [isString(), minLength(1)] },
    id_grade: { rules: [isString(), minLength(1)] },
    id_user: { rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    imageUrl: { rules: [isString()] },
    student_ids: { rules: [isArrayOfStrings()] },
  },
};
