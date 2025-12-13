import sequelize from "../config/database";

const { User, Role, Subject } = sequelize.models;

class UserRepository {
  async createUser(data: any) {
    return User.create(data);
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
          attributes: ["name"],
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
      role: data.Role.name,
      subjects: data.createdSubjects,
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

  async deleteUser(id_user: string) {
    return User.destroy({ where: { id_user } });
  }
}

export default new UserRepository();
