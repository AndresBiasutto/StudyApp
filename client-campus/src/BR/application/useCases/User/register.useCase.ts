import type { RegisterCredentials } from "../../../domain/entities/authCredentials.interface";
import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";

export class RegisterUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(credentials: RegisterCredentials): Promise<User> {
    return this.repository.register(credentials);
  }
}
