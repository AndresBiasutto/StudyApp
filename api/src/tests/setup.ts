import { mockClear, mockFn } from "jest-mock-extended";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

process.env.JWT_SECRET = "test-secret-key";
process.env.SECRET = "test-secret-key";
process.env.GOOGLE_CLIENT_ID = "test-client-id";
process.env.DB_NAME = "campus_test";
process.env.DB_USER = "postgres";
process.env.DB_PASS = "1234";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "5432";
process.env.PORT = "3000";
process.env.APP_URL = "http://localhost:3000";
process.env.OPENROUTER_API_KEY = "test-openrouter-key";
