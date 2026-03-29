import { isString, minLength } from "../middlewares/validation.middleware";

export const createChapterSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    id_unit: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const chapterIdParamSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateChapterSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    name: { rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
  },
};
