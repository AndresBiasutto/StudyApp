import type { Unit } from "../../../domain/entities/unit.interface";
import type { UnitRepository } from "../../../domain/services/unit.repository";

export class GetUnitByIdUseCase {
  private repository: UnitRepository;

  constructor(repository: UnitRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<Unit> {
    return this.repository.getById(id);
  }
}
