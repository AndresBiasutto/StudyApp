import sequelize from "../config/database";

const { Subject, Unit, Chapter, Video, Image } = sequelize.models;

class ChapterRepository {
  async create(data: any) {
    return Chapter.create(data);
  }

  async getOne(id_chapter: string) {
    return Chapter.findByPk(id_chapter);
  }

  async getOneWithContext(id_chapter: string) {
    return Chapter.findByPk(id_chapter, {
      include: [
        {
          model: Unit,
          as: "UnitChapters",
          include: [
            {
              model: Subject,
              as: "subjectUnits",
              attributes: ["id_subject"],
            },
          ],
        },
      ],
    });
  }

  async getAll() {
    return Chapter.findAll({
      include: [
        {
          model: Unit,
          as: "UnitChapters",
          attributes: ["order","name"],
        },
        {
          model: Video,
          as: "createdVideos",
          attributes: ["url"],
        },
        {
          model: Image,
          as: "createdImages",
          attributes: ["url"],
        },
      ],});
  }

  async getByName(name: string) {
    return Chapter.findOne({ where: { name } });
  }

  async update(id_chapter: string, data: any) {
    const chapter = await Chapter.findByPk(id_chapter);
    if (!chapter) return null;
    return chapter.update(data);
  }

  async saveDraft(id_chapter: string, data: any) {
    const chapter = await Chapter.findByPk(id_chapter);
    if (!chapter) return null;

    return chapter.update({
      ...data,
      status: "draft",
    });
  }

  async publish(id_chapter: string, data: any) {
    const chapter = await Chapter.findByPk(id_chapter);
    if (!chapter) return null;

    return chapter.update({
      ...data,
      status: "published",
      published_at: new Date(),
    });
  }

  async delete(id_chapter: string) {
    return Chapter.destroy({ where: { id_chapter } });
  }
}

export default new ChapterRepository();
