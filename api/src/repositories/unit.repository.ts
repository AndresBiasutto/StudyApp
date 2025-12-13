import sequelize from "../config/database";

const { Subject, Unit, Chapter } = sequelize.models;

class UnitRepository {
  async create(data: any) {
    return Unit.create(data);
  }

  async getOne(id_chapter: string) {
    return Unit.findByPk(id_chapter);
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

  async update(id_chapter: string, data: any) {
    const chapter = await Unit.findByPk(id_chapter);
    if (!chapter) return null;
    return chapter.update(data);
  }

  async delete(id_chapter: string) {
    return Unit.destroy({ where: { id_chapter } });
  }
}

export default new UnitRepository();