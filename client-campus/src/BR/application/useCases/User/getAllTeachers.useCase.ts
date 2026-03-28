import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";

export class GetAllTeachersUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(): Promise<User[]> {
    return this.repository.getAllTeachers();
  }
}
