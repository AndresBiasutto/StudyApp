import {
  isArrayOfStrings,
  isNumber,
  isString,
  minLength,
} from "../middlewares/validation.middleware";

export const createChapterSchema = {
  body: {
    name: { required: true, rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    order: { rules: [isNumber()] },
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
    order: { rules: [isNumber()] },
    summary: { rules: [isString()] },
    content_html: { rules: [isString()] },
    video_url: { rules: [isString()] },
    image_urls: { rules: [isArrayOfStrings()] },
    resource_links: { rules: [isArrayOfStrings()] },
  },
};

export const saveChapterDraftSchema = updateChapterSchema;

export const publishChapterSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    name: { rules: [isString(), minLength(1)] },
    description: { rules: [isString()] },
    order: { rules: [isNumber()] },
    summary: { rules: [isString()] },
    content_html: { rules: [isString()] },
    video_url: { rules: [isString()] },
    image_urls: { rules: [isArrayOfStrings()] },
    resource_links: { rules: [isArrayOfStrings()] },
  },
};
