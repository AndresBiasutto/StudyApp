import sequelize from "../config/database";

const { Grade } = sequelize.models;

class GradeRepository {
  async createGrade(data: any) {
    return Grade.create(data);
  }

  async getGrade(id_grade: string) {
    return Grade.findByPk(id_grade);
  }

  async getAllGrades() {
    return Grade.findAll();
  }

  async getGradeByName(name: string) {
    return Grade.findOne({ where: { name } });
  }

  async updateGrade(id_grade: string, data: any) {
    const grade = await Grade.findByPk(id_grade);
    if (!grade) return null;
    return grade.update(data);
  }

  async deleteGrade(id_grade: string) {
    return Grade.destroy({ where: { id_grade } });
  }
}

export default new GradeRepository();