import RoleRepository from "../repositories/role.repository";

class RoleService {
  async createRole(data: any) {
    return RoleRepository.createRole(data);
  }

  async getRole(id_role: string) {
    const role = await RoleRepository.getRole(id_role);
    if (!role) throw new Error("Role not found");
    return role;
  }

  async getAllRoles() {
    return RoleRepository.getAllRoles();
  }

  async getRoleByName(name: string) {
    return RoleRepository.getRoleByName(name);
  }

  async updateRole(id_role: string, data: any) {
    const Role = await RoleRepository.updateRole(id_role, data);
    if (!Role) throw new Error("Role not found");
    return Role;
  }

  async deleteRole(id_role: string) {
    const deleted = await RoleRepository.deleteRole(id_role);
    if (!deleted) throw new Error("Role not found");
    return true;
  }
}

export default new RoleService();
