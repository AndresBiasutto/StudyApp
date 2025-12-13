import hashPassword from "../utils/hashPassword";
import sendVerificationEmail from "../utils/sendVerificationEmail";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository";

class UserService {
  async createUser(data: any) {
    console.log(data);
    return userRepository.createUser(data);
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
    const response = {
      id_user: user.id_user,
      name: user.name,
      last_name: user.name,
      e_mail: user.e_mail,
      token: token,
      image: user.image,
      contactNumber: user.contactNumber,
      description: user.description,
      role: user.Role,
      createdSubjects: user.createdSubjects
    };
    return response;
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
    return user;
  }
  async getAllUsers() {
    return userRepository.getAllUsers();
  }
  async getUserByName(name: string) {
    return userRepository.getUserByName(name);
  }
  async getUserByEmail(e_mail: string) {
    return userRepository.getUserByEmail(e_mail);
  }
  async updateUser(id_user: string, data: any) {
    const user = await userRepository.updateUser(id_user, data);
    if (!user) throw new Error("User not found");
    return user;
  }
  async deleteUser(id_user: string) {
    const deleted = await userRepository.deleteUser(id_user);
    if (!deleted) throw new Error("User not found");
    return true;
  }
}

export default new UserService();
