import { isString, minLength } from "../middlewares/validation.middleware";

export const chapterExamParamSchema = {
  params: {
    id_chapter: { required: true, rules: [isString(), minLength(1)] },
  },
};
