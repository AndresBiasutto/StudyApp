import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(404).json({
    error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  const fallbackMessage =
    err instanceof Error ? err.message : "Internal server error";

  return res.status(500).json({
    error: fallbackMessage,
  });
};
