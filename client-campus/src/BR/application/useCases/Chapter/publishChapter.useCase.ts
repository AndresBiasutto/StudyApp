import type { Chapter } from "../../../domain/entities/chapter.interface";
import type { ChapterRepository } from "../../../domain/services/chapter.repository";

export class PublishChapterUseCase {
  private chapterRepository: ChapterRepository;
  constructor(chapterRepository: ChapterRepository) {
    this.chapterRepository = chapterRepository;
  }

  execute(id: string, chapter: Partial<Chapter>): Promise<Chapter> {
    return this.chapterRepository.publish(id, chapter);
  }
}
