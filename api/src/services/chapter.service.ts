import chapterService from "../repositories/chapter.repository";

class ChapterService {
  async create(data: any) {
    return chapterService.create(data);
  }

  async getOne(id_chapter: string) {
    const chapter = await chapterService.getOne(id_chapter);
    if (!chapter) throw new Error("Role not found");
    return chapter;
  }

  async getAll() {
    return chapterService.getAll();
  }

  async getByName(name: string) {
    return chapterService.getByName(name);
  }

  async update(id_chapter: string, data: any) {
    const Role = await chapterService.update(id_chapter, data);
    if (!Role) throw new Error("Role not found");
    return Role;
  }

  async delete(id_chapter: string) {
    const deleted = await chapterService.delete(id_chapter);
    if (!deleted) throw new Error("Role not found");
    return true;
  }
}

export default new ChapterService();
