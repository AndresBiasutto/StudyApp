import type { Chapter } from "../../../domain/entities/chapter.interface";
import type { ChapterRepository } from "../../../domain/services/chapter.repository";

export class CreateChapterUseCase {
  private repository: ChapterRepository;

  constructor(repository: ChapterRepository) {
    this.repository = repository;
  }

  execute(chapter: Partial<Chapter>): Promise<Chapter> {
    return this.repository.create(chapter);
  }
}
