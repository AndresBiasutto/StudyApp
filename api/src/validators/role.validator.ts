import { isString, minLength } from "../middlewares/validation.middleware";

export const roleIdParamSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const createRoleSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateRoleSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    name: { rules: [isString(), minLength(1)] },
  },
};
