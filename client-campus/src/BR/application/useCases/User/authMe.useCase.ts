import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";


export class AuthMe {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(): Promise<User> {
    return this.repository.authMe();
  }
}
