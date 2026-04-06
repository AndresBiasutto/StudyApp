import sequelize from "../config/database";

const { ExamResult } = sequelize.models;

class ExamResultRepository {
  async getByUserAndChapter(id_user: string, id_chapter: string) {
    return ExamResult.findOne({
      where: {
        id_user,
        id_chapter,
      },
    });
  }

  async saveForUserAndChapter(data: {
    id_exam: string;
    id_user: string;
    id_subject: string;
    id_chapter: string;
    score: number;
    total_questions: number;
    submitted_answers: string[];
  }) {
    const existingResult = await this.getByUserAndChapter(
      data.id_user,
      data.id_chapter,
    );

    if (existingResult) {
      return existingResult.update(data);
    }

    return ExamResult.create(data);
  }
}

export default new ExamResultRepository();
