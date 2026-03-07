import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";

export class UpdateRoleUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(id_user: string, id_role: string): Promise<User> {
    return this.repository.updateRole(id_user, id_role);
  }
}
