import unitRepository from "../repositories/unit.repository";

class UnitService {
  async createUnit(data: any) {
    return unitRepository.create(data,);
  }

  async getUnit(id_unit: string) {
    const unit = await unitRepository.getOne(id_unit);
    if (!unit) throw new Error("Unit not found");
    return unit;
  }

  async getAllUnits() {
    return unitRepository.getAll();
  }

  async getUnitByName(name: string) {
    return unitRepository.getByName(name);
  }

  async updateUnit(id_unit: string, data: any) {
    const unit = await unitRepository.update(id_unit, data);
    if (!unit) throw new Error("Unit not found");
    return unit;
  }

  async deleteUnit(id_unit: string) {
    const deleted = await unitRepository.delete(id_unit);
    if (!deleted) throw new Error("Unit not found");
    return true;
  }
}

export default new UnitService();
