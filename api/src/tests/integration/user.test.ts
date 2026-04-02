import jwt from "jsonwebtoken";
import request from "supertest";

import app from "../../app";
import userService from "../../services/user.service";
import comparePassword from "../../utils/comparePassword";

jest.mock("../../services/user.service");
jest.mock("../../utils/comparePassword");
jest.mock("jsonwebtoken");
jest.mock("google-auth-library");

describe("User API Integration Tests", () => {
  const mockUserService = userService as jest.Mocked<typeof userService>;
  const mockComparePassword = comparePassword as jest.MockedFunction<
    typeof comparePassword
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      mockUserService.getUserByEmail.mockResolvedValue(null);
      mockUserService.registerUser.mockResolvedValue({
        id_user: "user-123",
        name: "John",
        e_mail: "new@test.com",
      } as never);

      const response = await request(app).post("/api/users/register").send({
        name: "John",
        last_name: "Doe",
        e_mail: "new@test.com",
        password: "password123",
        id_role: "student-role",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id_user: "user-123",
          name: "John",
        }),
      );
    });

    it("should return 409 if email already exists", async () => {
      mockUserService.getUserByEmail.mockResolvedValue({ id_user: "existing" } as never);

      const response = await request(app).post("/api/users/register").send({
        name: "John",
        last_name: "Doe",
        e_mail: "existing@test.com",
        password: "password123",
        id_role: "student-role",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("El usuario ya existe");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login with valid credentials", async () => {
      mockUserService.getUserByEmail.mockResolvedValue({
        id_user: "user-123",
        e_mail: "test@test.com",
        password: "hashed-password",
        e_mail_verified: true,
      } as never);
      mockComparePassword.mockResolvedValue(true);
      mockUserService.loginUser.mockResolvedValue({
        token: "jwt-token",
        id_user: "user-123",
        name: "John",
      } as never);

      const response = await request(app).post("/api/users/login").send({
        e_mail: "test@test.com",
        password: "correctPassword",
      });

      expect(response.status).toBe(201);
      expect(response.body.token).toBe("jwt-token");
    });

    it("should return 404 with unknown email", async () => {
      mockUserService.getUserByEmail.mockResolvedValue(null);

      const response = await request(app).post("/api/users/login").send({
        e_mail: "notfound@test.com",
        password: "wrongPassword",
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Usuario no encontrado");
    });
  });

  describe("GET /api/users/me", () => {
    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/users/me");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token requerido");
    });

    it("should return user data with valid token", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ id_user: "user-123" });
      mockUserService.getMe.mockResolvedValue({
        id_user: "user-123",
        name: "John",
      } as never);

      const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", "Bearer valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id_user: "user-123",
          name: "John",
        }),
      );
    });
  });

  describe("GET /api/users", () => {
    it("should return all users for admin", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ id_user: "admin-123" });
      mockUserService.getUserRoleName.mockResolvedValue("admin");
      mockUserService.getAllUsers.mockResolvedValue([
        { id_user: "1", name: "Ana" },
      ] as never);

      const response = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        expect.objectContaining({ id_user: "1", name: "Ana" }),
      ]);
    });
  });

  describe("GET /api/users/allteachers", () => {
    it("should return teachers for admin", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ id_user: "admin-123" });
      mockUserService.getUserRoleName.mockResolvedValue("admin");
      mockUserService.getAllTeachers.mockResolvedValue([
        { id_user: "teacher-1", name: "Maria" },
      ] as never);

      const response = await request(app)
        .get("/api/users/allteachers")
        .set("Authorization", "Bearer valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        expect.objectContaining({ id_user: "teacher-1", name: "Maria" }),
      ]);
    });
  });

  describe("DELETE /api/users/:id_user", () => {
    it("should delete a user for admin", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ id_user: "admin-123" });
      mockUserService.getUserRoleName.mockResolvedValue("admin");
      mockUserService.deleteUser.mockResolvedValue(true);

      const response = await request(app)
        .delete("/api/users/user-123")
        .set("Authorization", "Bearer valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User deleted" });
    });
  });
});

describe("Health Check", () => {
  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/api/unknown");

    expect(response.status).toBe(404);
    expect(response.body.message).toContain("Ruta no encontrada");
  });
});
