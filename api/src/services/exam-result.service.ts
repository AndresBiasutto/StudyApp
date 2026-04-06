import { mapExamResponse, mapExamResultResponse } from "../contracts/mappers/response.mapper";
import chapterRepository from "../repositories/chapter.repository";
import examRepository from "../repositories/exam.repository";
import examResultRepository from "../repositories/exam-result.repository";
import { NotFoundError, ValidationError } from "../utils/errors";

interface ChapterContext {
  UnitChapters?: {
    subjectUnits?: {
      id_subject?: string;
    };
  };
}

class ExamResultService {
  async submitChapterExam(
    id_user: string,
    id_chapter: string,
    answers: string[],
  ) {
    if (!id_user) {
      throw new ValidationError("No se pudo identificar al usuario");
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      throw new ValidationError("Debes responder el examen antes de enviarlo");
    }

    const exam = await examRepository.getByChapterId(id_chapter);

    if (!exam) {
      throw new NotFoundError("El capitulo no tiene examen generado");
    }

    const chapter = await chapterRepository.getOneWithContext(id_chapter);

    if (!chapter) {
      throw new NotFoundError("Chapter not found");
    }

    const chapterData = chapter.get({ plain: true }) as ChapterContext;
    const id_subject = chapterData.UnitChapters?.subjectUnits?.id_subject;

    if (!id_subject) {
      throw new ValidationError(
        "No se pudo determinar la materia del capitulo",
      );
    }

    const examResponse = mapExamResponse(exam);

    if (answers.length !== examResponse.questions.length) {
      throw new ValidationError(
        "Debes responder todas las preguntas del examen",
      );
    }

    const score = examResponse.questions.reduce((total, question, index) => {
      return total + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    const savedResult = await examResultRepository.saveForUserAndChapter({
      id_exam: examResponse.id_exam,
      id_user,
      id_subject,
      id_chapter,
      score,
      total_questions: examResponse.questions.length,
      submitted_answers: answers,
    });

    return mapExamResultResponse(savedResult);
  }

  async getMyChapterExamResult(id_user: string, id_chapter: string) {
    if (!id_user) {
      throw new ValidationError("No se pudo identificar al usuario");
    }

    const examResult = await examResultRepository.getByUserAndChapter(
      id_user,
      id_chapter,
    );

    if (!examResult) {
      throw new NotFoundError("Todavia no registraste una nota en este capitulo");
    }

    return mapExamResultResponse(examResult);
  }
}

export default new ExamResultService();
