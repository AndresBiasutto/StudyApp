import type { Chapter } from "../../../domain/entities/chapter.interface";
import type { ChapterRepository } from "../../../domain/services/chapter.repository";

export class GetChaptersUseCase {
  private repository: ChapterRepository;

  constructor(repository: ChapterRepository) {
    this.repository = repository;
  }

  execute(): Promise<Chapter[]> {
    return this.repository.getAll();
  }
}
