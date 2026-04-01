import chapterRepository from "../repositories/chapter.repository";
import { NotFoundError, ValidationError } from "../utils/errors";
import { mapChapterResponse } from "../contracts/mappers/response.mapper";

interface ChapterInput {
  name?: string;
  description?: string;
  order?: number;
  summary?: string;
  content_html?: string;
  video_url?: string | null;
  image_urls?: string[];
  resource_links?: string[];
  id_unit?: string;
}

interface PersistedChapterState extends ChapterInput {
  id_chapter?: string;
}

class ChapterService {
  async create(data: ChapterInput) {
    const chapter = await chapterRepository.create(data);
    return mapChapterResponse(chapter);
  }

  async getOne(id_chapter: string) {
    const chapter = await chapterRepository.getOne(id_chapter);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async getAll() {
    const chapters = await chapterRepository.getAll();
    if (Array.isArray(chapters)) {
      const sortableChapters = chapters as Array<{ order?: number | null }>;
      sortableChapters.sort(
        (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
      );
    }
    return chapters.map(mapChapterResponse);
  }

  async getByName(name: string) {
    return chapterRepository.getByName(name);
  }

  async update(id_chapter: string, data: ChapterInput) {
    const chapter = await chapterRepository.update(id_chapter, data);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async saveDraft(id_chapter: string, data: ChapterInput) {
    const currentChapter = await chapterRepository.getOne(id_chapter);
    if (!currentChapter) throw new NotFoundError("Chapter not found");

    const current = currentChapter.get({ plain: true }) as PersistedChapterState;
    const merged: PersistedChapterState = {
      ...current,
      ...data,
    };

    if (!merged.name || String(merged.name).trim().length === 0) {
      throw new ValidationError("El capitulo debe tener un nombre");
    }

    const chapter = await chapterRepository.saveDraft(id_chapter, data);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async publish(id_chapter: string, data: ChapterInput) {
    const currentChapter = await chapterRepository.getOne(id_chapter);
    if (!currentChapter) throw new NotFoundError("Chapter not found");

    const current = currentChapter.get({ plain: true }) as PersistedChapterState;
    const merged: PersistedChapterState = {
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

    const chapter = await chapterRepository.publish(id_chapter, data);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return mapChapterResponse(chapter);
  }

  async delete(id_chapter: string) {
    const deleted = await chapterRepository.delete(id_chapter);
    if (!deleted) throw new NotFoundError("Chapter not found");
    return true;
  }
}

export default new ChapterService();
