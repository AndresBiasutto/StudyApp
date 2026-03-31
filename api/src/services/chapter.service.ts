import chapterService from "../repositories/chapter.repository";
import { NotFoundError, ValidationError } from "../utils/errors";
import { mapChapterResponse } from "../contracts/mappers/response.mapper";

class ChapterService {
  async create(data: any) {
    const chapter = await chapterService.create(data);
    return mapChapterResponse(chapter);
  }

  async getOne(id_chapter: string) {
    const chapter = await chapterService.getOne(id_chapter);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async getAll() {
    const chapters = await chapterService.getAll();
    return chapters.map(mapChapterResponse);
  }

  async getByName(name: string) {
    return chapterService.getByName(name);
  }

  async update(id_chapter: string, data: any) {
    const chapter = await chapterService.update(id_chapter, data);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async saveDraft(id_chapter: string, data: any) {
    const chapter = await chapterService.saveDraft(id_chapter, data);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async publish(id_chapter: string, data: any) {
    const currentChapter = await chapterService.getOne(id_chapter);
    if (!currentChapter) throw new NotFoundError("Chapter not found");

    const current = currentChapter.get({ plain: true }) as any;
    const merged = {
      ...current,
      ...data,
    };

    if (!merged.name || String(merged.name).trim().length === 0) {
      throw new ValidationError("El capitulo debe tener nombre para publicarse");
    }

    if (!merged.content_html || String(merged.content_html).trim().length === 0) {
      throw new ValidationError(
        "El capitulo debe tener contenido para publicarse",
      );
    }

    const chapter = await chapterService.publish(id_chapter, data);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async delete(id_chapter: string) {
    const deleted = await chapterService.delete(id_chapter);
    if (!deleted) throw new NotFoundError("Chapter not found");
    return true;
  }
}

export default new ChapterService();
