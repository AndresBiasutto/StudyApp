import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import {
  mapAuthResponse,
  mapUserListResponse,
  mapUserResponse,
} from "../contracts/mappers/response.mapper";
import userRepository from "../repositories/user.repository";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../utils/errors";
import comparePassword from "../utils/comparePassword";
import hashPassword from "../utils/hashPassword";

const client = new OAuth2Client(env.googleClientId);

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
}

interface LoginUserInput {
  e_mail: string;
  password: string;
}

interface UpdateProfileInput {
  name?: string;
  last_name?: string;
  description?: string | null;
  contact_number?: string | null;
  image?: string | null;
}

interface GoogleUserInput {
  e_mail: string;
  name?: string;
  last_name?: string;
  image?: string;
}

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

const toPlainUserData = (
  value: {
    password?: string | null;
    e_mail_verified?: boolean;
    get?: (options: { plain: boolean }) => unknown;
  },
) => {
  if (typeof value.get === "function") {
    return value.get({ plain: true }) as {
      password?: string | null;
      e_mail_verified?: boolean;
    };
  }

  return value;
};

class UserService {
  private ensureNotSelfManaged(targetUserId: string, currentUserId?: string) {
    if (currentUserId && currentUserId === targetUserId) {
      throw new ForbiddenError(
        "No puedes administrarte a ti mismo desde este modulo",
      );
    }
  }

  private sanitizeProfileUpdate(data: UpdateProfileInput): UpdateProfileInput {
    const sanitized: UpdateProfileInput = {};

    if (typeof data.name === "string") {
      sanitized.name = data.name.trim();
    }

    if (typeof data.last_name === "string") {
      sanitized.last_name = data.last_name.trim();
    }

    if (typeof data.description === "string") {
      sanitized.description = data.description.trim();
    } else if (data.description === null) {
      sanitized.description = null;
    }

    if (typeof data.contact_number === "string") {
      sanitized.contact_number = data.contact_number.trim();
    } else if (data.contact_number === null) {
      sanitized.contact_number = null;
    }

    if (typeof data.image === "string") {
      sanitized.image = data.image.trim();
    } else if (data.image === null) {
      sanitized.image = null;
    }

    return sanitized;
  }

  private async resolveDefaultPublicRoleId() {
    const defaultRole =
      (await userRepository.getRoleByName("student")) ??
      (await userRepository.getRoleByName("user"));

    if (!defaultRole) {
      throw new ValidationError(
        "No se encontro un rol publico por defecto para registrar usuarios",
      );
    }

    const roleData = defaultRole.get({ plain: true }) as { id_role?: string };

    if (!roleData.id_role) {
      throw new ValidationError("El rol por defecto no es valido");
    }

    return roleData.id_role;
  }

  async authUser(googleToken: string) {
    if (!env.googleClientId) {
      throw new Error("GOOGLE_CLIENT_ID no esta configurado");
    }

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: env.googleClientId,
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

    const jwtToken = jwt.sign({ id_user: user.id_user }, env.jwtSecret, {
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

  async updateMe(id_user: string, data: UpdateProfileInput) {
    const userToUpdate = await userRepository.getUser(id_user);

    if (!userToUpdate) {
      throw new NotFoundError("User not found");
    }

    const sanitizedData = this.sanitizeProfileUpdate(data);

    if (Object.keys(sanitizedData).length === 0) {
      throw new ValidationError("Debes enviar al menos un campo para actualizar");
    }

    await userRepository.updateUser(id_user, sanitizedData);

    const updatedUser = await userRepository.getUser(id_user);

    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }

    return mapUserResponse(updatedUser);
  }

  async registerUser(data: RegisterUserInput) {
    const existingUser = await userRepository.getUserByEmail(data.e_mail);

    if (existingUser) {
      throw new ConflictError("El usuario ya existe");
    }

    const encriptedPassword = await hashPassword(data.password);
    const defaultRoleId = data.id_role ?? (await this.resolveDefaultPublicRoleId());
    const newUser = {
      name: data.name,
      last_name: data.last_name,
      description: data.description,
      e_mail: data.e_mail,
      e_mail_verified: true,
      verification_token: null,
      password: encriptedPassword,
      contact_number: data.contact_number,
      image: data.image,
      provider: "local",
      id_role: defaultRoleId,
    };

    const createdUser = await userRepository.registerUser(newUser);
    const userId = extractUserId(createdUser);
    const token = jwt.sign({ id_user: userId }, env.jwtSecret, {
      expiresIn: "1d",
    });
    const fullUser = await userRepository.getUser(userId);

    if (!fullUser) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return mapAuthResponse(fullUser, token);
  }

  async loginUser(data: LoginUserInput) {
    const user = await userRepository.getUserByEmail(data.e_mail);

    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }

    const userData = toPlainUserData(user);

    if (!userData.password) {
      throw new UnauthorizedError(
        "Este usuario no tiene acceso por contrasena. Inicia sesion con Google",
      );
    }

    const passwordMatches = await comparePassword(data.password, userData.password);

    if (!passwordMatches) {
      throw new UnauthorizedError("Contrasena invalida");
    }

    if (userData.e_mail_verified === false) {
      throw new UnauthorizedError("Correo no verificado");
    }

    const userId = extractUserId(user);
    const token = jwt.sign({ id_user: userId }, env.jwtSecret, {
      expiresIn: "1d",
    });
    const fullUser = await userRepository.getUser(userId);

    if (!fullUser) {
      throw new NotFoundError("Usuario no encontrado");
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

  async getSelectedUser(id_user: string, currentUserId?: string) {
    this.ensureNotSelfManaged(id_user, currentUserId);

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

  async getAllLiDataUsers(currentUserId?: string) {
    const users = await userRepository.getAllLiDataUsers(currentUserId);
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

  async updateUserRole(id_user: string, id_role: string, currentUserId?: string) {
    if (!id_role) {
      throw new ValidationError("id_role es necesario");
    }

    this.ensureNotSelfManaged(id_user, currentUserId);

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

  async deleteUser(id_user: string, currentUserId?: string) {
    this.ensureNotSelfManaged(id_user, currentUserId);

    const deleted = await userRepository.deleteUser(id_user);
    if (!deleted) throw new NotFoundError("User not found");
    return true;
  }
}

export default new UserService();
