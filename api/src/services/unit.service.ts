import unitRepository from "../repositories/unit.repository";
import { NotFoundError } from "../utils/errors";

class UnitService {
  async createUnit(data: any) {
    return unitRepository.create(data,);
  }

  async getUnit(id_unit: string) {
    const unit = await unitRepository.getOne(id_unit);
    if (!unit) throw new NotFoundError("Unit not found");
    return unit;
  }

  async getAllUnits() {
    const units = await unitRepository.getAll();
    // ensure ordering by order ascending
    if (Array.isArray(units)) {
      units.sort((a: any, b: any) => (Number(a.order ?? 0) - Number(b.order ?? 0)));
      units.forEach((u: any) => {
        if (Array.isArray(u.createdChapters)) {
          u.createdChapters.sort((c1: any, c2: any) => (Number(c1.order ?? 0) - Number(c2.order ?? 0)));
        }
      });
    }
    return units;
  }

  async getUnitByName(name: string) {
    return unitRepository.getByName(name);
  }

  async updateUnit(id_unit: string, data: any) {
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
