import sequelize from "../config/database";

const { Role } = sequelize.models;

class RoleRepository {
  async createRole(data: any) {
    return Role.create(data);
  }

  async getRole(id_role: string) {
    return Role.findByPk(id_role);
  }

  async getAllRoles() {
    return Role.findAll();
  }

  async getRoleByName(name: string) {
    return Role.findOne({ where: { name } });
  }

  async updateRole(id_role: string, data: any) {
    const role = await Role.findByPk(id_role);
    if (!role) return null;
    return role.update(data);
  }

  async deleteRole(id_role: string) {
    return Role.destroy({ where: { id_role } });
  }
}

export default new RoleRepository();