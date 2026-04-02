import jwt from "jsonwebtoken";

import { signToken } from "../utils/jwt";

describe("JWT Utils", () => {
  const testSecret = "test-secret-key";

  beforeAll(() => {
    process.env.SECRET = testSecret;
  });

  describe("signToken", () => {
    it("should sign a token with payload", () => {
      const payload = { id_user: "123-456", email: "test@test.com" };
      const token = signToken(payload);

      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });

    it("should generate a token that can be verified", () => {
      const payload = { id_user: "test-id" };
      const token = signToken(payload);

      const decoded = jwt.verify(token, testSecret) as { id_user: string };

      expect(decoded.id_user).toBe("test-id");
    });

    it("should include expiration in token", () => {
      const payload = { id_user: "test-id" };
      const token = signToken(payload);

      const decoded = jwt.decode(token) as { exp: number };

      expect(decoded.exp).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Date.now() / 1000);
    });
  });
});
