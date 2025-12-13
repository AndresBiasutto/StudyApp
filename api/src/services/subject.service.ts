import  subjectRepository  from "../repositories/subject.repository";

class SubjectService {
  createSubject(data: any) {
    return subjectRepository.createSubject(data);
  }

  getSubject(id: string) {
    return subjectRepository.getSubject(id);
  }

  getAllSubjects() {
    return subjectRepository.getAllSubjects();
  }

  getSubjectByName(name: string) {
    return subjectRepository.getSubjectByName(name);
  }

  updateSubject(id: string, data: any) {
    return subjectRepository.updateSubject(id, data);
  }

  deleteSubject(id: string) {
    return subjectRepository.deleteSubject(id);
  }
}
export default new SubjectService();