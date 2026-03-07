// src/controllers/health.controller.ts
import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
};
