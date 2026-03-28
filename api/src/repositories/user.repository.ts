import sequelize from "../config/database";
import { UserEntity } from "./entities/userEntity.entity";
import { mapUserModelToEntity } from "./mappers/user.mapper";
const { User, Role, Subject, Grade } = sequelize.models;

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
    return User.findByPk(id_user, {
      include: [
        {
          model: Role,
          attributes: ["id_role", "name"],
        },
        {
          model: Subject,
          as: "createdSubjects",
          attributes: ["id_subject", "name", "description", "imageUrl"],
          include: [
            {
              model: Grade,
              attributes: ["id_grade", "name"],
            },
          ],
        },
        {
          model: Subject,
          as: "enrolledSubjects",
          attributes: ["id_subject", "name", "description", "imageUrl"],
          include: [
            {
              model: Grade,
              attributes: ["id_grade", "name"],
            },
          ],
        },
      ],
    });
  }
  async getSelectedUser(id_user: string) {
    return this.getUser(id_user);
  }
  async getAllUsers() {
    return User.findAll({
      include: [
        {
          model: Role,
          attributes: ["id_role", "name"],
        },
        {
          model: Subject,
          as: "createdSubjects",
          attributes: ["id_subject", "name", "description", "imageUrl"],
          include: [
            {
              model: Grade,
              attributes: ["id_grade", "name"],
            },
          ],
        },
      ],
    });
  }
  async getAllLiDataUsers() {
    return this.getAllUsers();
  }
  async getAllUsersByRole(roleName: string) {
    return User.findAll({
      include: [
        {
          model: Role,
          attributes: ["id_role", "name"],
          where: { name: roleName },
        },
      ],
      order: [
        ["name", "ASC"],
        ["last_name", "ASC"],
      ],
    });
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
  async getUserRoleName(id_user: string) {
    const user: any = await User.findByPk(id_user, {
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });

    return user?.Role?.name ?? null;
  }
  async updateUser(id_user: string, data: any) {
    const user = await User.findByPk(id_user);
    if (!user) return null;
    return user.update(data);
  }
  async updateUserRole(id_user: string, roleUpdated: object) {
    const user = await User.findByPk(id_user);
    if (!user) return null;
    return user.update(roleUpdated);
  }
  async deleteUser(id_user: string) {
    return User.destroy({ where: { id_user } });
  }
}

export default new UserRepository();
