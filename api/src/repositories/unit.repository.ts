import sequelize from "../config/database";

const { Subject, Unit, Chapter } = sequelize.models;

class UnitRepository {
  async create(data: any) {
    return Unit.create(data);
  }

  async getOne(id_unit: string) {
    return Unit.findByPk(id_unit);
  }

  async getAll() {
    return Unit.findAll({
      include: [
        {
          model: Subject,
          as: "subjectUnits",
          attributes: ["name"],
        },
      {
        model: Chapter,
        as: "createdChapters",
        attributes: ["name"],
      }]
    });
  }

  async getByName(name: string) {
    return Unit.findOne({ where: { name } });
  }

  async update(id_unit: string, data: any) {
    const unit = await Unit.findByPk(id_unit);
    if (!unit) return null;
    return unit.update(data);
  }

  async delete(id_unit: string) {
    return Unit.destroy({ where: { id_unit } });
  }
}

export default new UnitRepository();
