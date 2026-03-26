import type { Unit } from "../../../domain/entities/unit.interface";
import type { UnitRepository } from "../../../domain/services/unit.repository";

export class GetUnitsUseCase {
  private repository: UnitRepository;

  constructor(repository: UnitRepository) {
    this.repository = repository;
  }

  execute(): Promise<Unit[]> {
    return this.repository.getAll();
  }
}
