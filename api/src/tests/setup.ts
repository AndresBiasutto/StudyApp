import { mockClear, mockFn } from 'jest-mock-extended';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

process.env.JWT_SECRET = 'test-secret-key';
process.env.SECRET = 'test-secret-key';
process.env.GOOGLE_CLIENT_ID = 'test-client-id';
