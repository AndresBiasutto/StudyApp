import subjectRepository from "../repositories/subject.repository";
import { mapSubjectResponse } from "../contracts/mappers/response.mapper";

class SubjectService {
  async createSubject(data: any) {
    const subject = await subjectRepository.createSubject(data);
    return mapSubjectResponse(subject);
  }

  async getSubject(id: string) {
    const subject = await subjectRepository.getSubject(id);
    if (!subject) {
      return null;
    }

    return mapSubjectResponse(subject);
  }

  async getAllSubjects() {
    const subjects = await subjectRepository.getAllSubjects();
    return subjects.map(mapSubjectResponse);
  }

  getSubjectByName(name: string) {
    return subjectRepository.getSubjectByName(name);
  }

  async updateSubject(id: string, data: any) {
    const subject = await subjectRepository.updateSubject(id, data);
    if (!subject) {
      return null;
    }

    return mapSubjectResponse(subject);
  }

  deleteSubject(id: string) {
    return subjectRepository.deleteSubject(id);
  }
}
export default new SubjectService();
