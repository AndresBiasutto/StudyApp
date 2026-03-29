import { isString, minLength } from "../middlewares/validation.middleware";

export const createUnitSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    id_subject: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const unitIdParamSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateUnitSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    name: { rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
  },
};
