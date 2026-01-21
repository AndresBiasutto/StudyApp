import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";

export class UpdateUserUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(id: number, user: Partial<User>): Promise<User> {
    return this.repository.update(id, user);
  }
}
