import RoleRepository from "../repositories/role.repository";
import { NotFoundError } from "../utils/errors";

interface RoleInput {
  name: string;
}

class RoleService {
  async createRole(data: RoleInput) {
    return RoleRepository.createRole(data);
  }

  async getRole(id_role: string) {
    const role = await RoleRepository.getRole(id_role);
    if (!role) throw new NotFoundError("Role not found");
    return role;
  }

  async getAllRoles() {
    return RoleRepository.getAllRoles();
  }

  async getRoleByName(name: string) {
    return RoleRepository.getRoleByName(name);
  }

  async updateRole(id_role: string, data: Partial<RoleInput>) {
    const role = await RoleRepository.updateRole(id_role, data);
    if (!role) throw new NotFoundError("Role not found");
    return role;
  }

  async deleteRole(id_role: string) {
    const deleted = await RoleRepository.deleteRole(id_role);
    if (!deleted) throw new NotFoundError("Role not found");
    return true;
  }
}

export default new RoleService();
