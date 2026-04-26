import type { User } from "../../../domain/entities/user.interface";
import type { UpdateProfileData } from "../../../domain/entities/updateProfile.interface";
import type { UserRepository } from "../../../domain/services/user.repository";

export class UpdateProfileUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(data: UpdateProfileData): Promise<User> {
    return this.repository.updateMe(data);
  }
}
