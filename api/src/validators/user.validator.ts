import {
  isArrayOfStrings,
  isEmail,
  isString,
  minLength,
} from "../middlewares/validation.middleware";

export const createUserSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
    last_name: { required: true, rules: [isString(), minLength(1)] },
    e_mail: { required: true, rules: [isString(), isEmail()] },
    id_role: { required: true, rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    contact_number: { rules: [isString()] },
    image: { rules: [isString()] },
  },
};

export const authUserSchema = {
  body: {
    token: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const registerUserSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
    last_name: { required: true, rules: [isString(), minLength(1)] },
    e_mail: { required: true, rules: [isString(), isEmail()] },
    password: { required: true, rules: [isString(), minLength(6)] },
    id_role: { rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    contact_number: { rules: [isString()] },
    image: { rules: [isString()] },
  },
};

export const loginUserSchema = {
  body: {
    e_mail: { required: true, rules: [isString(), isEmail()] },
    password: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const verifyTokenSchema = {
  query: {
    token: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const userIdParamSchema = {
  params: {
    id_user: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateUserRoleSchema = {
  params: {
    id_user: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    id_role: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateUserSchema = {
  params: {
    id_user: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    name: { rules: [isString(), minLength(1)] },
    last_name: { rules: [isString(), minLength(1)] },
    e_mail: { rules: [isString(), isEmail()] },
    description: { rules: [isString()] },
    contact_number: { rules: [isString()] },
    image: { rules: [isString()] },
    id_role: { rules: [isString(), minLength(1)] },
    student_ids: { rules: [isArrayOfStrings()] },
  },
};

export const updateMeSchema = {
  body: {
    name: { rules: [isString(), minLength(1)] },
    last_name: { rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    contact_number: { rules: [isString()] },
  },
};
