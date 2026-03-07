import GradeRepository from "../repositories/grade.repository";

class GradeService {
  async createGrade(data: any) {
    return GradeRepository.createGrade(data);
  }
  async getGrade(id_grade: string) {
    const grade = await GradeRepository.getGrade(id_grade);
    if (!grade) throw new Error("Grade not found");
    return grade;
  }
  async getAllGrades() {
    return GradeRepository.getAllGrades();
  }
  async getGradeByName(name: string) {
    return GradeRepository.getGradeByName(name);
  }
  async updateGrade(id_grade: string, data: any) {
    const Grade = await GradeRepository.updateGrade(id_grade, data);
    if (!Grade) throw new Error("Grade not found");
    return Grade;
  }
  async deleteGrade(id_grade: string) {
    const deleted = await GradeRepository.deleteGrade(id_grade);
    if (!deleted) throw new Error("Grade not found");
    return true;
  }
}

export default new GradeService();
