import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";


export class CreateUserUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(user: Omit<User, "id_user">): Promise<User> {
    return this.repository.create(user);
  }
}
