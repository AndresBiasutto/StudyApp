import chapterService from "../repositories/chapter.repository";
import { NotFoundError } from "../utils/errors";

class ChapterService {
  async create(data: any) {
    return chapterService.create(data);
  }

  async getOne(id_chapter: string) {
    const chapter = await chapterService.getOne(id_chapter);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return chapter;
  }

  async getAll() {
    return chapterService.getAll();
  }

  async getByName(name: string) {
    return chapterService.getByName(name);
  }

  async update(id_chapter: string, data: any) {
    const chapter = await chapterService.update(id_chapter, data);
    if (!chapter) throw new NotFoundError("Chapter not found");
    return chapter;
  }

  async delete(id_chapter: string) {
    const deleted = await chapterService.delete(id_chapter);
    if (!deleted) throw new NotFoundError("Chapter not found");
    return true;
  }
}

export default new ChapterService();
