import roleService from "../services/role.service";

class RoleController {
  create(newRole: object) {
    return roleService.createRole(newRole);
  }
  getOne(id_role: string) {
    return roleService.getRole(id_role);
  }
  getAll() {
    return roleService.getAllRoles();
  }
  getByName(name: string) {
    return roleService.getRoleByName(name);
  }
  update(id_role: string, data: object) {
    return roleService.updateRole(id_role, data);
  }
  delete(id_role: string) {
    roleService.deleteRole(id_role);
  }
}

export default new RoleController();
