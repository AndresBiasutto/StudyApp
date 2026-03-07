import sequelize from "../config/database";
import { UserEntity } from "./entities/userEntity.entity";
import { mapUserModelToEntity } from "./mappers/user.mapper";
const { User, Role, Subject } = sequelize.models;

class UserRepository {
  async createUser(data: any) {
    return User.create(data);
  }
  async findOrCreateGoogleUser(data: any): Promise<UserEntity> {
    const { e_mail } = data;

    const existingUser = await User.findOne({
      where: { e_mail },
      include: [{ model: Role }],
    });

    if (existingUser) return mapUserModelToEntity(existingUser) as UserEntity;
    const defaultRole: any = await Role.findOne({ where: { name: "user" } });

    const newUser = await User.create({
      ...data,
      id_role: defaultRole.id_role,
      provider: "google",
    });

    return mapUserModelToEntity(newUser);
  }

  async registerUser(data: any) {
    return User.create(data);
  }
  async getUser(id_user: string) {
    const data: any = await User.findByPk(id_user, {
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
        {
          model: Subject,
          as: "createdSubjects",
          attributes: ["id_subject", "name", "description"],
        },
      ],
    });
    const formatedData = {
      id_user: data.id_user,
      name: data.name,
      last_name: data.last_name,
      description: data.description,
      e_mail: data.e_mail,
      // e_mail_verified: data.e_mail_verified,
      // verification_token: data.verification_token,
      // password: data.password,
      contact_number: data.contact_number,
      image: data.image,
      Role: data.Role,
      subjects: data.createdSubjects,
      id_role: data.id_role
    };
    return formatedData;
  }
  async getSelectedUser(id_user: string) {
    const selectedUser = await this.getUser(id_user);
    const formatedData = {
      id_user: selectedUser.id_user,
      name: selectedUser.name,
      last_name: selectedUser.last_name,
      description: selectedUser.description,
      e_mail: selectedUser.e_mail,
      contact_number: selectedUser.contact_number,
      image: selectedUser.image,
      Role: selectedUser.Role,
      subjects: selectedUser.subjects,
    };
    return formatedData;
  }
  async getAllUsers() {
    return User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
        {
          model: Subject,
          as: "createdSubjects",
          attributes: ["name"],
        },
      ],
    });
  }
  async getAllLiDataUsers() {
    const users = await this.getAllUsers();
    const listedUsers = users.map((user: any) => {
      return {
        id_user: user.id_user,
        name: user.name,
        last_name: user.last_name,
        image: user.image,
        Role: user.Role,
      };
    });
    return listedUsers;
  }
  async getUserByName(name: string) {
    return User.findOne({ where: { name } });
  }
  async findByToken(token: string) {
    return User.findOne({
      where: { verification_token: token },
    });
  }
  async getUserByEmail(e_mail: string) {
    return User.findOne({
      where: { e_mail },
      include: [
        {
          model: Role,
          attributes: ["id_role", "name"],
        },
        {
          model: Subject,
          as: "createdSubjects",
          attributes: ["id_subject", "name"],
        },
      ],
    });
  }
  async updateUser(id_user: string, data: any) {
    const user = await User.findByPk(id_user);
    if (!user) return null;
    return user.update(data);
  }
  async updateUserRole(id_user: string, roleUpdated: object) {
    const user = await User.findByPk(id_user, {
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
        {
          model: Subject,
          as: "createdSubjects",
          attributes: ["id_subject", "name", "description"],
        },
      ],
    });
    if (!user) return null;
    return user.update(roleUpdated);
  }
  async deleteUser(id_user: string) {
    return User.destroy({ where: { id_user } });
  }
}

export default new UserRepository();
