import dotenv from "dotenv";

dotenv.config();

type DbSyncMode = "none" | "alter";
type DbSslMode = "disable" | "require";

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

const parseDbSslMode = (value: string | undefined): DbSslMode => {
  if (!value) {
    return "disable";
  }

  if (value === "disable" || value === "require") {
    return value;
  }

  throw new Error(
    "Environment variable DB_SSL_MODE must be 'disable' or 'require'",
  );
};

const parseDatabaseUrl = (
  value: string | undefined,
): {
  databaseUrl?: string;
  name?: string;
  user?: string;
  pass?: string;
  host?: string;
  port?: number;
} => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return {};
  }

  let parsed: URL;

  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("Environment variable DATABASE_URL must be a valid URL");
  }

  return {
    databaseUrl: trimmed,
    name: parsed.pathname.replace(/^\//, ""),
    user: decodeURIComponent(parsed.username),
    pass: decodeURIComponent(parsed.password),
    host: parsed.hostname,
    port: parsed.port ? parseNumber(parsed.port, 5432, "DATABASE_URL") : 5432,
  };
};

const port = parseNumber(process.env.PORT, 3000, "PORT");
const jwtSecret = process.env.SECRET?.trim() || process.env.JWT_SECRET?.trim();
const databaseConfig = parseDatabaseUrl(
  process.env.DATABASE_URL ||
    process.env.EXTERNALDATABASEURL ||
    process.env.INTERNALDATABASEURL,
);

if (!jwtSecret) {
  throw new Error("Environment variable SECRET is required");
}

export const env = {
  nodeEnv: process.env.NODE_ENV?.trim() || "development",
  port,
  appUrl: process.env.APP_URL?.trim() || `http://localhost:${port}`,
  jwtSecret,
  openRouterApiKey:
    process.env.OPENROUTER_API_KEY?.trim() ||
    process.env.OPENROUTER_KEY?.trim(),
  googleClientId: process.env.GOOGLE_CLIENT_ID?.trim(),
  emailUser: process.env.EMAIL_USER?.trim(),
  emailPassword:
    process.env.EMAIL_PASSWORD?.trim() || process.env.EMAIL_PASS?.trim(),
  db: {
    url: databaseConfig.databaseUrl,
    name: databaseConfig.name || requireEnv("DB_NAME"),
    user: databaseConfig.user || requireEnv("DB_USER"),
    pass: databaseConfig.pass || requireEnv("DB_PASS"),
    host: databaseConfig.host || requireEnv("DB_HOST"),
    port: databaseConfig.port || parseNumber(process.env.DB_PORT, 5432, "DB_PORT"),
    sslMode: parseDbSslMode(process.env.DB_SSL_MODE),
    syncMode: parseDbSyncMode(process.env.DB_SYNC_MODE),
  },
} as const;
