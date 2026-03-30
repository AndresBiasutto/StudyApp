import type { Chapter } from "../../../domain/entities/chapter.interface";
import type { ChapterRepository } from "../../../domain/services/chapter.repository";

export class GetChapterByIdUseCase {
  private repository: ChapterRepository;

  constructor(repository: ChapterRepository) {
    this.repository = repository;
  }

  execute(id: string| undefined): Promise<Chapter> {
    return this.repository.getById(id);
  }
}
