import { isString, minLength } from "../middlewares/validation.middleware";

export const createMediaSchema = {
  body: {
    url: { required: true, rules: [isString(), minLength(1)] },
    id_chapter: { rules: [isString(), minLength(1)] },
  },
};
