
import type { Subject } from "../../../domain/entities/subject.interface";
import type { SubjectRepository } from "../../../domain/services/subjectRepository";


export class UpdateSubjectTeacherUseCase {
  private repository: SubjectRepository;

  constructor(repository: SubjectRepository) {
    this.repository = repository;
  }

  execute(id: string, subject: Partial<Subject>): Promise<Subject> {
    return this.repository.update(id, subject);
  }
}
