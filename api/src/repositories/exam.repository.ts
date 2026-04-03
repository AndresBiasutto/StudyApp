import sequelize from "../config/database";
import { ValidationError } from "../utils/errors";

const { Exam } = sequelize.models;

const handleMissingExamTable = (error: unknown): never => {
  const message = error instanceof Error ? error.message : "";

  if (
    message.includes('no existe la relación «Exams»') ||
    message.includes('relation "Exams" does not exist')
  ) {
    throw new ValidationError(
      "La tabla Exams no existe en la base de datos. Crea el esquema del modelo Exam con una migracion o levanta temporalmente el backend con DB_SYNC_MODE=alter.",
    );
  }

  throw error;
};

class ExamRepository {
  async getByChapterId(id_chapter: string) {
    try {
      return await Exam.findOne({ where: { id_chapter } });
    } catch (error) {
      handleMissingExamTable(error);
    }
  }

  async saveByChapterId(
    id_chapter: string,
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: string;
    }>,
  ) {
    let existingExam;

    try {
      existingExam = await this.getByChapterId(id_chapter);
    } catch (error) {
      handleMissingExamTable(error);
    }

    if (existingExam) {
      try {
        return await existingExam.update({ questions });
      } catch (error) {
        handleMissingExamTable(error);
      }
    }

    try {
      return await Exam.create({
        id_chapter,
        questions,
      });
    } catch (error) {
      handleMissingExamTable(error);
    }
  }
}

export default new ExamRepository();
