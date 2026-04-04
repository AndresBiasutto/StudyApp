import { OpenRouter } from "@openrouter/sdk";

import { mapExamQuestionResponse, mapExamResponse } from "../contracts/mappers/response.mapper";
import { env } from "../config/env";
import chapterRepository from "../repositories/chapter.repository";
import examRepository from "../repositories/exam.repository";
import { NotFoundError, ValidationError } from "../utils/errors";

interface QuizQuestion {
  question: string;
  options: [string, string, string];
  correctAnswer: string;
}

const MAX_SOURCE_TEXT_LENGTH = 6000;
const MAX_COMPLETION_TOKENS = 700;

const stripHtml = (content: string): string =>
  content
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const extractJson = (content: string): string => {
  const trimmed = content.trim();

  if (trimmed.startsWith("```")) {
    return trimmed
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
  }

  const arrayStart = trimmed.indexOf("[");
  const arrayEnd = trimmed.lastIndexOf("]");

  if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
    return trimmed.slice(arrayStart, arrayEnd + 1);
  }

  const objectStart = trimmed.indexOf("{");
  const objectEnd = trimmed.lastIndexOf("}");

  if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
    return trimmed.slice(objectStart, objectEnd + 1);
  }

  return trimmed;
};

const normalizeQuiz = (payload: unknown): QuizQuestion[] => {
  const questions = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        Array.isArray((payload as { exam?: unknown[] }).exam)
      ? (payload as { exam: unknown[] }).exam
      : [];

  if (questions.length !== 4) {
    throw new ValidationError("La IA debe devolver exactamente 4 preguntas");
  }

  return questions.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new ValidationError(`La pregunta ${index + 1} es invalida`);
    }

    const question = String(
      (item as { question?: unknown }).question ?? "",
    ).trim();
    const options = Array.isArray((item as { options?: unknown[] }).options)
      ? (item as { options: unknown[] }).options
          .map((option) => String(option).trim())
          .filter(Boolean)
      : [];
    const correctAnswer = String(
      (item as { correctAnswer?: unknown }).correctAnswer ?? "",
    ).trim();

    if (!question) {
      throw new ValidationError(
        `La pregunta ${index + 1} no tiene un enunciado valido`,
      );
    }

    if (options.length !== 3) {
      throw new ValidationError(
        `La pregunta ${index + 1} debe tener exactamente 3 opciones`,
      );
    }

    const uniqueOptions = new Set(options);

    if (uniqueOptions.size !== 3) {
      throw new ValidationError(
        `La pregunta ${index + 1} contiene opciones repetidas`,
      );
    }

    if (!options.includes(correctAnswer)) {
      throw new ValidationError(
        `La pregunta ${index + 1} no tiene una respuesta correcta valida`,
      );
    }

    return {
      question,
      options: [options[0], options[1], options[2]],
      correctAnswer,
    };
  });
};

class AiService {
  private openRouter = new OpenRouter({
    apiKey: env.openRouterApiKey || "",
  });

  async generateQuiz(id_chapter: string, force = false) {
    const existingExam = await examRepository.getByChapterId(id_chapter);

    if (existingExam && !force) {
      return mapExamResponse(existingExam).questions;
    }

    const chapter = await chapterRepository.getOne(id_chapter);

    if (!chapter) {
      throw new NotFoundError("Chapter not found");
    }

    const chapterData = chapter.get({
      plain: true,
    }) as { content_html?: string | null };

    const sourceText = stripHtml(chapterData.content_html ?? "").slice(
      0,
      MAX_SOURCE_TEXT_LENGTH,
    );

    if (!sourceText) {
      throw new ValidationError(
        "El capitulo no tiene contenido para generar un examen",
      );
    }

    if (!env.openRouterApiKey) {
      throw new ValidationError("OPENROUTER_API_KEY no esta configurada");
    }

    const prompt = `
Lee y comprende el siguiente texto:
${sourceText}

Actua como profesor de la materia tratada en el texto.
Genera exactamente 4 preguntas de opcion multiple basadas solo en ese texto.

Reglas obligatorias:
- cada pregunta debe tener exactamente 3 opciones
- solo 1 opcion debe ser correcta
- las opciones deben ser plausibles
- devuelve exclusivamente un JSON array
- no agregues explicaciones
- no agregues markdown

Formato exacto:
[
  {
    "question": "Pregunta 1",
    "options": ["opcion 1", "opcion 2", "opcion 3"],
    "correctAnswer": "opcion 2"
  },
  {
    "question": "Pregunta 2",
    "options": ["opcion 1", "opcion 2", "opcion 3"],
    "correctAnswer": "opcion 3"
  },
  {
    "question": "Pregunta 3",
    "options": ["opcion 1", "opcion 2", "opcion 3"],
    "correctAnswer": "opcion 1"
  },
  {
    "question": "Pregunta 4",
    "options": ["opcion 1", "opcion 2", "opcion 3"],
    "correctAnswer": "opcion 2"
  }
]
`.trim();

    const completion = await this.openRouter.chat.send({
      chatRequest: {
        model: "deepseek/deepseek-r1",
        maxTokens: MAX_COMPLETION_TOKENS,
        messages: [
          {
            role: "system",
            content:
              "Debes responder solo con JSON valido y sin texto extra.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      throw new ValidationError("La IA no devolvio contenido");
    }

    const parsed = JSON.parse(extractJson(content)) as unknown;
    const questions = normalizeQuiz(parsed);
    const savedExam = await examRepository.saveByChapterId(id_chapter, questions);

    return mapExamResponse(savedExam).questions.map(mapExamQuestionResponse);
  }
}

export default new AiService();
