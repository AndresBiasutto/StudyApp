import { isString, minLength } from "../middlewares/validation.middleware";

export const gradeIdParamSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const createGradeSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateGradeSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    name: { rules: [isString(), minLength(1)] },
  },
};
