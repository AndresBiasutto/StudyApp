import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/errors";

type ValidatorTarget = "body" | "params" | "query";

interface ValidationIssue {
  field: string;
  message: string;
}

type ValidationRule = (value: unknown) => string | null;

interface FieldSchema {
  required?: boolean;
  rules?: ValidationRule[];
}

type ObjectSchema = Record<string, FieldSchema>;

interface RequestSchema {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const validateObject = (
  target: ValidatorTarget,
  data: unknown,
  schema: ObjectSchema,
): ValidationIssue[] => {
  if (!isRecord(data)) {
    return [{ field: target, message: "Debe ser un objeto válido" }];
  }

  const issues: ValidationIssue[] = [];

  for (const [field, fieldSchema] of Object.entries(schema)) {
    const value = data[field];
    const isMissing = value === undefined || value === null || value === "";

    if (fieldSchema.required && isMissing) {
      issues.push({
        field: `${target}.${field}`,
        message: "Es obligatorio",
      });
      continue;
    }

    if (isMissing || !fieldSchema.rules) {
      continue;
    }

    for (const rule of fieldSchema.rules) {
      const error = rule(value);
      if (error) {
        issues.push({
          field: `${target}.${field}`,
          message: error,
        });
      }
    }
  }

  return issues;
};

export const validate =
  (schema: RequestSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const issues: ValidationIssue[] = [
      ...(schema.body ? validateObject("body", req.body, schema.body) : []),
      ...(schema.params
        ? validateObject("params", req.params, schema.params)
        : []),
      ...(schema.query ? validateObject("query", req.query, schema.query) : []),
    ];

    if (issues.length > 0) {
      return next(new ValidationError("Error de validación", issues));
    }

    return next();
  };

export const isString =
  (message = "Debe ser un string"): ValidationRule =>
  (value) =>
    typeof value === "string" ? null : message;

export const minLength =
  (min: number, message?: string): ValidationRule =>
  (value) =>
    typeof value === "string" && value.trim().length >= min
      ? null
      : (message ?? `Debe tener al menos ${min} caracteres`);

export const isEmail =
  (message = "Debe ser un email válido"): ValidationRule =>
  (value) =>
    typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? null
      : message;

export const isBoolean =
  (message = "Debe ser un booleano"): ValidationRule =>
  (value) =>
    typeof value === "boolean" ? null : message;

export const isArrayOfStrings =
  (message = "Debe ser un arreglo de strings"): ValidationRule =>
  (value) =>
    Array.isArray(value) && value.every((item) => typeof item === "string")
      ? null
      : message;

export const isNumber =
  (message = "Debe ser un numero"): ValidationRule =>
  (value) =>
    typeof value === "number" && !Number.isNaN(value) ? null : message;
