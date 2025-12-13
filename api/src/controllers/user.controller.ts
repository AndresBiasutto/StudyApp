import userService from "../services/user.service";
import comparePassword from "../utils/comparePassword";

interface User {
  e_mail: string;
  [key: string]: any;
}

class UserController {
  async registerUser(newUser: User) {
    const newUserEmail = newUser["e_mail"];
    const dbUserEmail = await userService.getUserByEmail(newUserEmail);
    if (dbUserEmail) {
      throw new Error("El usuario ya existe");
    }
    return userService.registerUser(newUser);
  }

  async loginUser(data: any) {
    const userFound: any = await userService.getUserByEmail(data.e_mail);
    if (!userFound) {
      throw new Error("Usuario no encontrado");
    }
    const matchPassword = await comparePassword(
      data.password,
      userFound.password
    );
    if (!matchPassword) {
      throw new Error("Contraseña inválida");
      // return { token: null, message: "Contraseña inválida" };
    }
    if (data.e_mail_verified) {
      throw new Error("Correo no verificado, revisa tu correo electrónico");
    }
    return userService.loginUser(data);
  }

  createUser(newUser: object) {
    return userService.createUser(newUser);
  }
  async verify(token: any) {
    const user = await userService.findByToken(token);
    if (!user) {
      throw new Error("Token inválido o expirado.");
    }
    return userService.verify(token);
  }

  getUser(id_user: string) {
    return userService.getUser(id_user);
  }
  getAllUsers() {
    return userService.getAllUsers();
  }
  getUserByName(name: string) {
    return userService.getUserByName(name);
  }
  updateUser(id_user: string, data: object) {
    return userService.updateUser(id_user, data);
  }
  deleteUser(id_user: string) {
    userService.deleteUser(id_user);
  }
}

export default new UserController();
