import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = `Ruta no encontrada: ${req.method} ${req.originalUrl}`;
  console.log(`[404] ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message,
    error: message,
  });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    const payload = {
      message: err.message,
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    };

    return res.status(err.statusCode).json({
      ...payload,
    });
  }

  const fallbackMessage =
    err instanceof Error ? err.message : "Internal server error";

  return res.status(500).json({
    message: fallbackMessage,
    error: fallbackMessage,
  });
};
