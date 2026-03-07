import gradeService from "../services/grade.service";

class GradeController {
  create(newGrade: object) {
    return gradeService.createGrade(newGrade);
  }
  getOne(grade: string) {
    return gradeService.getGrade(grade);
  }
  getAll() {
    return gradeService.getAllGrades();
  }
  getByName(name: string) {
    return gradeService.getGradeByName(name);
  }
  update(grade: string, data: object) {
    return gradeService.updateGrade(grade, data);
  }
  delete(grade: string) {
    gradeService.deleteGrade(grade);
  }
}

export default new GradeController();
