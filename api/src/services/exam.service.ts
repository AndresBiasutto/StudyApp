import examRepository from "../repositories/exam.repository";
import { mapExamResponse } from "../contracts/mappers/response.mapper";
import { NotFoundError } from "../utils/errors";

class ExamService {
  async getChapterExam(id_chapter: string) {
    const exam = await examRepository.getByChapterId(id_chapter);

    if (!exam) {
      throw new NotFoundError("El capitulo no tiene examen generado");
    }

    return mapExamResponse(exam).questions;
  }
}

export default new ExamService();
