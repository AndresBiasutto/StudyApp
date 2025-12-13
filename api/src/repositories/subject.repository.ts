import sequelize from "../config/database";
const { User, Subject, Unit } = sequelize.models;

class SubjectRepository {

  async createSubject(data: any) {
    return await Subject.create(data);
  }

  async getSubject(id: string) {
    return await Subject.findByPk(id);
  }

  async getAllSubjects() {
    return await Subject.findAll({
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id_user", "name"],
        },

        {
          model: Unit,
          as: "createdUnits",
          attributes: ["order","name"],
        },
      ],
    });
  }

  async getSubjectByName(name: string) {
    return await Subject.findOne({ where: { name } });
  }

  async updateSubject(id: string, data: any) {
    const subject = await Subject.findByPk(id);
    if (!subject) return null;
    return await subject.update(data);
  }

  async deleteSubject(id: string) {
    const subject = await Subject.findByPk(id);
    if (!subject) return null;
    await subject.destroy();
    return subject;
  }
}
export default new SubjectRepository();
