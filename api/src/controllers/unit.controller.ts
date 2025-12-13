import unitService from "../services/unit.service";

class UnitController {
  create(newUnit: object) {
    return unitService.createUnit(newUnit);
  }
  getOne(id_unit: string) {
    return unitService.getUnit(id_unit);
  }
  getAll() {
    return unitService.getAllUnits();
  }
  getByName(name: string) {
    return unitService.getUnitByName(name);
  }
  update(id_unit: string, data: object) {
    return unitService.updateUnit(id_unit, data);
  }
  delete(id_unit: string) {
    unitService.deleteUnit(id_unit);
  }
}

export default new UnitController();
