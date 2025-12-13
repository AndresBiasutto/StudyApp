import chapterService from "../services/chapter.service";

class ChapterController {
  async create(chapter: object) {
    // const newChapter = await chapterService.create(chapter);
    return chapterService.create(chapter);
  }
  getOne(id_role: string) {
    return chapterService.getOne(id_role);
  }
  getAll() {
    return chapterService.getAll();
  }
  getByName(name: string) {
    return chapterService.getByName(name);
  }
  update(id_role: string, data: object) {
    return chapterService.update(id_role, data);
  }
  delete(id_role: string) {
    chapterService.delete(id_role);
  }
}

export default new ChapterController();
