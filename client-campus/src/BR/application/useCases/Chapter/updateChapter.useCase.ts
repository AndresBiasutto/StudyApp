import type { Chapter } from "../../../domain/entities/chapter.interface";
import type { ChapterRepository } from "../../../domain/services/chapter.repository";

export class UpdateChapterUseCase {
  private repository: ChapterRepository;

  constructor(repository: ChapterRepository) {
    this.repository = repository;
  }

  execute(id: string, chapter: Partial<Chapter>): Promise<Chapter> {
    return this.repository.update(id, chapter);
  }
}
