// src/utils/jwt.ts
import jwt from "jsonwebtoken";

export const signToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h"
  });
};
