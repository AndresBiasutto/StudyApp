import hashPassword from "../utils/hashPassword";
import sendVerificationEmail from "../utils/sendVerificationEmail";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository";
import { OAuth2Client } from "google-auth-library";
import {
  mapAuthResponse,
  mapUserListResponse,
  mapUserResponse,
} from "../contracts/mappers/response.mapper";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserService {
  async authUser(googleToken: string) {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new Error("Token de Google inválido");
    }

    const user = await userRepository.findOrCreateGoogleUser({
      e_mail: payload.email,
      name: payload.given_name,
      last_name: payload.family_name,
      image: payload.picture,
    });

    const SECRET = process.env.SECRET as string;
    const jwtToken = jwt.sign({ id_user: user.id_user }, SECRET, {
      expiresIn: "1d",
    });
    const fullUser = await userRepository.getUser(user.id_user);

    if (!fullUser) {
      throw new Error("Usuario no encontrado");
    }

    return mapAuthResponse(fullUser, jwtToken);
  }

  async getMe(id_user: string) {
    const user = await userRepository.getUser(id_user);

    if (!user) {
      throw new Error("User not found");
    }

    return mapUserResponse(user);
  }

  async createUser(data: any) {
    const user = await userRepository.createUser(data);
    return mapUserListResponse(user);
  }
  async registerUser(data: any) {
    const encriptedPassword = await hashPassword(data.password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser: any = {
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
    sendVerificationEmail(data.e_mail, verificationToken);
    return await userRepository.registerUser(newUser);
  }
  async loginUser(data: any) {
    const SECRET: any = process.env.SECRET;
    const user: any = await userRepository.getUserByEmail(data.e_mail);
    const token: any = jwt.sign({ id_user: user.id_user }, SECRET, {
      expiresIn: 84600,
    });
    const fullUser = await userRepository.getUser(user.id_user);

    if (!fullUser) {
      throw new Error("User not found");
    }

    return mapAuthResponse(fullUser, token);
  }
  async findByToken(token: any) {
    return userRepository.findByToken(token);
  }
  async verify(token: string) {
    const user: any = await userRepository.findByToken(token);
    const updatedUser = {
      ...user,
      e_mail_verified: true,
      verification_token: null,
    };
    await userRepository.updateUser(user.id_user, updatedUser);
    return "Correo verificado correctamente";
  }
  async getUser(id_user: string) {
    const user = await userRepository.getUser(id_user);
    if (!user) throw new Error("User not found");
    return mapUserResponse(user);
  }
  async getSelectedUser(id_user: string) {
    const user = await userRepository.getSelectedUser(id_user);
    if (!user) throw new Error("User not found");
    return mapUserResponse(user);
  }
  async getAllUsers() {
    const users = await userRepository.getAllUsers();
    const mapped = users.map(mapUserResponse);
    // sort alphabetically by name then last_name
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
    mapped.sort((a, b) => ((a.name || "").toString().toLowerCase() < (b.name || "").toString().toLowerCase() ? -1 : 1));
    return mapped;
  }
  async getAllStudents() {
    const users = await userRepository.getAllUsersByRole("student");
    const mapped = users.map(mapUserListResponse);
    mapped.sort((a, b) => ((a.name || "").toString().toLowerCase() < (b.name || "").toString().toLowerCase() ? -1 : 1));
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
  async updateUser(id_user: string, data: any) {
    const user = await userRepository.updateUser(id_user, data);
    if (!user) throw new Error("User not found");
    return mapUserListResponse(user);
  }
  async updateUserRole(id_user: string, id_role: string) {
    const userToUpdateRole = await userRepository.getUser(id_user);

    if (!userToUpdateRole) {
      throw new Error("User not found");
    }

    await userRepository.updateUserRole(id_user, { id_role });

    const updatedUser = await userRepository.getUser(id_user);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return mapUserResponse(updatedUser);
  }
  async deleteUser(id_user: string) {
    const deleted = await userRepository.deleteUser(id_user);
    if (!deleted) throw new Error("User not found");
    return true;
  }
}

export default new UserService();
