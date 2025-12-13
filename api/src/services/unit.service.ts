import unitRepository from "../repositories/unit.repository";

class UnitService {
  async createUnit(data: any) {
    return unitRepository.create(data,);
  }

  async getUnit(id_chapter: string) {
    const unit = await unitRepository.getOne(id_chapter);
    if (!unit) throw new Error("Unit not found");
    return unit;
  }

  async getAllUnits() {
    return unitRepository.getAll();
  }

  async getUnitByName(name: string) {
    return unitRepository.getByName(name);
  }

  async updateUnit(id_chapter: string, data: any) {
    const Unit = await unitRepository.update(id_chapter, data);
    if (!Unit) throw new Error("Unit not found");
    return Unit;
  }

  async deleteUnit(id_chapter: string) {
    const deleted = await unitRepository.delete(id_chapter);
    if (!deleted) throw new Error("Unit not found");
    return true;
  }
}

export default new UnitService();
