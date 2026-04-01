import GradeRepository from "../repositories/grade.repository";
import { NotFoundError } from "../utils/errors";

interface GradeInput {
  name: string;
}

class GradeService {
  async createGrade(data: GradeInput) {
    return GradeRepository.createGrade(data);
  }
  async getGrade(id_grade: string) {
    const grade = await GradeRepository.getGrade(id_grade);
    if (!grade) throw new NotFoundError("Grade not found");
    return grade;
  }
  async getAllGrades() {
    return GradeRepository.getAllGrades();
  }
  async getGradeByName(name: string) {
    return GradeRepository.getGradeByName(name);
  }
  async updateGrade(id_grade: string, data: Partial<GradeInput>) {
    const grade = await GradeRepository.updateGrade(id_grade, data);
    if (!grade) throw new NotFoundError("Grade not found");
    return grade;
  }
  async deleteGrade(id_grade: string) {
    const deleted = await GradeRepository.deleteGrade(id_grade);
    if (!deleted) throw new NotFoundError("Grade not found");
    return true;
  }
}

export default new GradeService();
