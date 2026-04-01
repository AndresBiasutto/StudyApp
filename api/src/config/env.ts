import dotenv from "dotenv";

dotenv.config();

type DbSyncMode = "none" | "alter";

const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }

  return value;
};

const parseNumber = (
  value: string | undefined,
  fallback: number,
  variableName: string,
): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Environment variable ${variableName} must be a positive integer`);
  }

  return parsed;
};

const parseDbSyncMode = (value: string | undefined): DbSyncMode => {
  if (!value) {
    return "none";
  }

  if (value === "none" || value === "alter") {
    return value;
  }

  throw new Error("Environment variable DB_SYNC_MODE must be 'none' or 'alter'");
};

const port = parseNumber(process.env.PORT, 3000, "PORT");
const jwtSecret = process.env.SECRET?.trim() || process.env.JWT_SECRET?.trim();

if (!jwtSecret) {
  throw new Error("Environment variable SECRET is required");
}

export const env = {
  nodeEnv: process.env.NODE_ENV?.trim() || "development",
  port,
  appUrl: process.env.APP_URL?.trim() || `http://localhost:${port}`,
  jwtSecret,
  googleClientId: process.env.GOOGLE_CLIENT_ID?.trim(),
  emailUser: process.env.EMAIL_USER?.trim(),
  emailPassword:
    process.env.EMAIL_PASSWORD?.trim() || process.env.EMAIL_PASS?.trim(),
  db: {
    name: requireEnv("DB_NAME"),
    user: requireEnv("DB_USER"),
    pass: requireEnv("DB_PASS"),
    host: requireEnv("DB_HOST"),
    port: parseNumber(process.env.DB_PORT, 5432, "DB_PORT"),
    syncMode: parseDbSyncMode(process.env.DB_SYNC_MODE),
  },
} as const;
