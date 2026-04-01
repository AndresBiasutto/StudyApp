import unitRepository from "../repositories/unit.repository";
import { NotFoundError } from "../utils/errors";

interface UnitInput {
  name?: string;
  description?: string;
  order?: number;
  imageUrl?: string;
  id_subject?: string;
}

class UnitService {
  async createUnit(data: UnitInput) {
    return unitRepository.create(data);
  }

  async getUnit(id_unit: string) {
    const unit = await unitRepository.getOne(id_unit);
    if (!unit) throw new NotFoundError("Unit not found");
    return unit;
  }

  async getAllUnits() {
    const units = await unitRepository.getAll();
    if (Array.isArray(units)) {
      const sortableUnits = units as Array<{
        order?: number | null;
        createdChapters?: Array<{ order?: number | null }>;
      }>;

      sortableUnits.sort(
        (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
      );
      sortableUnits.forEach((u) => {
        if (Array.isArray(u.createdChapters)) {
          u.createdChapters.sort(
            (c1, c2) => Number(c1.order ?? 0) - Number(c2.order ?? 0),
          );
        }
      });
    }
    return units;
  }

  async getUnitByName(name: string) {
    return unitRepository.getByName(name);
  }

  async updateUnit(id_unit: string, data: UnitInput) {
    const unit = await unitRepository.update(id_unit, data);
    if (!unit) throw new NotFoundError("Unit not found");
    return unit;
  }

  async deleteUnit(id_unit: string) {
    const deleted = await unitRepository.delete(id_unit);
    if (!deleted) throw new NotFoundError("Unit not found");
    return true;
  }
}

export default new UnitService();
