import {
  isArrayOfStrings,
  isString,
  minLength,
} from "../middlewares/validation.middleware";

export const chapterExamParamSchema = {
  params: {
    id_chapter: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const submitExamResultSchema = {
  params: {
    id_chapter: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    answers: { required: true, rules: [isArrayOfStrings()] },
  },
};
