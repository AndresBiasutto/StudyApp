import sequelize from "../config/database";
const { User, Subject, Unit, Grade, Chapter } = sequelize.models;

class SubjectRepository {
  async createSubject(data: any) {
    return await Subject.create(data);
  }

  async getSubject(id: string) {
    return await Subject.findByPk(id, {
      include: [
        {
          model: Grade,
          attributes: ["id_grade", "name"],
        },
        {
          model: Unit,
          as: "createdUnits",
          attributes: ["id_unit", "order", "name", "description"],
          include: [
            {
              model: Chapter,
              as: "createdChapters",
              attributes: ["id_chapter", "order", "name", "description"],
            },
          ],
        },
        {
          model: User,
          as: "students",
          attributes: ["id_user", "name", "last_name", "image"],
          through: { attributes: [] },
        },
      ],
    });
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
          attributes: ["order", "name"],
        },
        {
          model: Grade,
          attributes: ["id_grade", "name"],
        },
        {
          model: User,
          as: "students",
          attributes: ["id_user", "name", "last_name", "image"],
          through: { attributes: [] },
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

    const { student_ids, ...subjectData } = data;

    if (Object.keys(subjectData).length > 0) {
      await subject.update(subjectData);
    }

    if (Array.isArray(student_ids)) {
      const students = await User.findAll({
        where: { id_user: student_ids },
      });

      await (subject as any).setStudents(students);
    }

    return await this.getSubject(id);
  }

  async deleteSubject(id: string) {
    const subject = await Subject.findByPk(id);
    if (!subject) return null;
    await subject.destroy();
    return subject;
  }
}
export default new SubjectRepository();
