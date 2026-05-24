import {
  isArrayOfStrings,
  isString,
  minLength,
  type ValidationRule,
} from "../middlewares/validation.middleware";

const isDateString =
  (message = "Debe ser una fecha valida con formato YYYY-MM-DD"): ValidationRule =>
  (value) =>
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? null
      : message;

const isTimeString =
  (message = "Debe ser una hora valida con formato HH:MM"): ValidationRule =>
  (value) =>
    typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
      ? null
      : message;

export const createCalendarSchema = {
  body: {
    title: { required: true, rules: [isString(), minLength(1)] },
    text: { required: true, rules: [isString(), minLength(1)] },
    date: { required: true, rules: [isString(), isDateString()] },
    receptor: { rules: [isArrayOfStrings()] },
    role: { rules: [isString()] },
    hour: { rules: [isString(), isTimeString()] },
  },
};

export const calendarIdParamSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
};

export const updateCalendarSchema = {
  params: {
    id: { required: true, rules: [isString(), minLength(1)] },
  },
  body: {
    title: { rules: [isString(), minLength(1)] },
    text: { rules: [isString(), minLength(1)] },
    date: { rules: [isString(), isDateString()] },
    receptor: { rules: [isArrayOfStrings()] },
    role: { rules: [isString()] },
    hour: { rules: [isString(), isTimeString()] },
  },
};
