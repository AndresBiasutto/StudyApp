import type { ChapterRepository } from "../../../domain/services/chapter.repository";

export class DeleteChapterUseCase {
  private repository: ChapterRepository;

  constructor(repository: ChapterRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
