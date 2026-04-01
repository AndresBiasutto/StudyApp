import subjectRepository from "../repositories/subject.repository";
import { mapSubjectResponse } from "../contracts/mappers/response.mapper";
import { NotFoundError } from "../utils/errors";

interface SubjectInput {
  name?: string;
  id_grade?: string;
  id_user?: string;
  description?: string;
  imageUrl?: string;
  student_ids?: string[];
}

class SubjectService {
  async createSubject(data: SubjectInput) {
    const subject = await subjectRepository.createSubject(data);
    return mapSubjectResponse(subject);
  }

  async getSubject(id: string) {
    const subject = await subjectRepository.getSubject(id);
    if (!subject) throw new NotFoundError("Subject not found");

    return mapSubjectResponse(subject);
  }

  async getAllSubjects() {
    const subjects = await subjectRepository.getAllSubjects();
    const mapped = subjects.map(mapSubjectResponse);
    // Sort subjects by name A-Z
    mapped.sort((a, b) => {
      const na = (a.name || "").toString().toLowerCase();
      const nb = (b.name || "").toString().toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      return 0;
    });
    // ensure units and chapters are ordered by 'order' ascending
    mapped.forEach((s) => {
      if (Array.isArray(s.createdUnits)) {
        s.createdUnits.sort((u1, u2) => (Number(u1.order ?? 0) - Number(u2.order ?? 0)));
        s.createdUnits.forEach((u) => {
          if (Array.isArray(u.createdChapters)) {
            u.createdChapters.sort((c1, c2) => (Number(c1.order ?? 0) - Number(c2.order ?? 0)));
          }
        });
      }
    });
    return mapped;
  }

  getSubjectByName(name: string) {
    return subjectRepository.getSubjectByName(name);
  }

  async updateSubject(id: string, data: SubjectInput) {
    const subject = await subjectRepository.updateSubject(id, data);
    if (!subject) throw new NotFoundError("Subject not found");

    return mapSubjectResponse(subject);
  }

  async deleteSubject(id: string) {
    const deleted = await subjectRepository.deleteSubject(id);
    if (!deleted) throw new NotFoundError("Subject not found");
    return true;
  }
}
export default new SubjectService();
