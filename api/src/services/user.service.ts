import crypto from "crypto";

import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import {
  mapAuthResponse,
  mapUserListResponse,
  mapUserResponse,
} from "../contracts/mappers/response.mapper";
import userRepository from "../repositories/user.repository";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../utils/errors";
import hashPassword from "../utils/hashPassword";
import sendVerificationEmail from "../utils/sendVerificationEmail";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface CreateUserInput {
  name?: string;
  last_name?: string;
  e_mail: string;
  id_role?: string;
  description?: string;
  contact_number?: string;
  image?: string;
}

interface RegisterUserInput extends CreateUserInput {
  password: string;
  e_mail_verified?: boolean;
}

interface LoginUserInput {
  e_mail: string;
  password: string;
}

interface GoogleUserInput {
  e_mail: string;
  name?: string;
  last_name?: string;
  image?: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.SECRET;

  if (!secret) {
    throw new Error("SECRET no esta configurado");
  }

  return secret;
};

const extractUserId = (
  value: { id_user?: string; get?: (options: { plain: boolean }) => unknown },
): string => {
  if (typeof value.id_user === "string") {
    return value.id_user;
  }

  if (typeof value.get === "function") {
    const plain = value.get({ plain: true }) as { id_user?: string };

    if (typeof plain.id_user === "string") {
      return plain.id_user;
    }
  }

  throw new NotFoundError("User not found");
};

class UserService {
  async authUser(googleToken: string) {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new UnauthorizedError("Token de Google invalido");
    }

    const user = await userRepository.findOrCreateGoogleUser({
      e_mail: payload.email,
      name: payload.given_name,
      last_name: payload.family_name,
      image: payload.picture,
    } as GoogleUserInput);

    const jwtToken = jwt.sign({ id_user: user.id_user }, getJwtSecret(), {
      expiresIn: "1d",
    });
    const fullUser = await userRepository.getUser(user.id_user);

    if (!fullUser) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return mapAuthResponse(fullUser, jwtToken);
  }

  async getMe(id_user: string) {
    const user = await userRepository.getUser(id_user);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return mapUserResponse(user);
  }

  async createUser(data: CreateUserInput) {
    const user = await userRepository.createUser(data);
    return mapUserListResponse(user);
  }

  async registerUser(data: RegisterUserInput) {
    const encriptedPassword = await hashPassword(data.password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = {
      name: data.name,
      last_name: data.last_name,
      description: data.description,
      e_mail: data.e_mail,
      e_mail_verified: data.e_mail_verified,
      verification_token: verificationToken,
      password: encriptedPassword,
      contact_number: data.contact_number,
      image: data.image,
      id_role: data.id_role,
    };

    // El email es best-effort por ahora; no bloquea el alta si falla.
    void sendVerificationEmail(data.e_mail, verificationToken).catch((error) => {
      console.error("No se pudo enviar el email de verificacion:", error);
    });

    return userRepository.registerUser(newUser);
  }

  async loginUser(data: LoginUserInput) {
    const user = await userRepository.getUserByEmail(data.e_mail);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const userId = extractUserId(user);
    const token = jwt.sign({ id_user: userId }, getJwtSecret(), {
      expiresIn: 84600,
    });
    const fullUser = await userRepository.getUser(userId);

    if (!fullUser) {
      throw new NotFoundError("User not found");
    }

    return mapAuthResponse(fullUser, token);
  }

  async findByToken(token: string) {
    return userRepository.findByToken(token);
  }

  async verify(token: string) {
    const user = await userRepository.findByToken(token);

    if (!user) {
      throw new NotFoundError("Token invalido o expirado.");
    }

    const userId = extractUserId(user);
    const updatedUser = {
      ...user,
      e_mail_verified: true,
      verification_token: null,
    };

    await userRepository.updateUser(userId, updatedUser);
    return "Correo verificado correctamente";
  }

  async getUser(id_user: string) {
    const user = await userRepository.getUser(id_user);
    if (!user) throw new NotFoundError("User not found");
    return mapUserResponse(user);
  }

  async getSelectedUser(id_user: string) {
    const user = await userRepository.getSelectedUser(id_user);
    if (!user) throw new NotFoundError("User not found");
    return mapUserResponse(user);
  }

  async getAllUsers() {
    const users = await userRepository.getAllUsers();
    const mapped = users.map(mapUserResponse);

    mapped.sort((a, b) => {
      const na = (a.name || "").toString().toLowerCase();
      const nb = (b.name || "").toString().toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      const la = (a.last_name || "").toString().toLowerCase();
      const lb = (b.last_name || "").toString().toLowerCase();
      if (la < lb) return -1;
      if (la > lb) return 1;
      return 0;
    });

    return mapped;
  }

  async getAllLiDataUsers() {
    const users = await userRepository.getAllLiDataUsers();
    const mapped = users.map(mapUserListResponse);

    mapped.sort((a, b) => {
      const na = (a.name || "").toString().toLowerCase();
      const nb = (b.name || "").toString().toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      const la = (a.last_name || "").toString().toLowerCase();
      const lb = (b.last_name || "").toString().toLowerCase();
      if (la < lb) return -1;
      if (la > lb) return 1;
      return 0;
    });

    return mapped;
  }

  async getAllTeachers() {
    const users = await userRepository.getAllUsersByRole("teacher");
    const mapped = users.map(mapUserListResponse);

    mapped.sort((a, b) =>
      (a.name || "").toString().toLowerCase() <
      (b.name || "").toString().toLowerCase()
        ? -1
        : 1,
    );

    return mapped;
  }

  async getAllStudents() {
    const users = await userRepository.getAllUsersByRole("student");
    const mapped = users.map(mapUserListResponse);

    mapped.sort((a, b) =>
      (a.name || "").toString().toLowerCase() <
      (b.name || "").toString().toLowerCase()
        ? -1
        : 1,
    );

    return mapped;
  }

  async getUserByName(name: string) {
    return userRepository.getUserByName(name);
  }

  async getUserByEmail(e_mail: string) {
    return userRepository.getUserByEmail(e_mail);
  }

  async getUserRoleName(id_user: string) {
    return userRepository.getUserRoleName(id_user);
  }

  async updateUser(id_user: string, data: Partial<CreateUserInput>) {
    const user = await userRepository.updateUser(id_user, data);
    if (!user) throw new NotFoundError("User not found");
    return mapUserListResponse(user);
  }

  async updateUserRole(id_user: string, id_role: string) {
    if (!id_role) {
      throw new ValidationError("id_role es necesario");
    }

    const userToUpdateRole = await userRepository.getUser(id_user);

    if (!userToUpdateRole) {
      throw new NotFoundError("User not found");
    }

    await userRepository.updateUserRole(id_user, { id_role });

    const updatedUser = await userRepository.getUser(id_user);

    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }

    return mapUserResponse(updatedUser);
  }

  async deleteUser(id_user: string) {
    const deleted = await userRepository.deleteUser(id_user);
    if (!deleted) throw new NotFoundError("User not found");
    return true;
  }
}

export default new UserService();
