import { OpenRouter } from "@openrouter/sdk";

import { env } from "../config/env";
import { ValidationError } from "../utils/errors";

interface QuizQuestion {
  question: string;
  options: [string, string, string];
  correctAnswer: string;
}

const chapter =
  "Analisis y Desarrollo de Sistemas. Los Sistemas de Informacion (SI) y las Tecnologias de Informacion (TI) han cambiado la forma en que operan las organizaciones actuales. A traves de su uso se logran importantes mejoras, ya que automatizan los procesos operativos, suministran una plataforma de informacion necesaria para la toma de decisiones y, lo mas importante, su implementacion logra ventajas competitivas. Dentro de los SI tambien debemos contemplar algunos conceptos y metodologias de alto impacto. La informacion es uno de los principales recursos con que cuenta la organizacion. Los entes que toman decisiones han comenzado a comprender que la informacion no es solo un subproducto de la conduccion, sino que alimenta al propio sistema y puede ser uno de los factores criticos para determinar el exito o fracaso. Si deseamos maximizar la utilidad de la informacion, el sistema organizacional debe manejarla de forma correcta y eficiente, como los demas recursos existentes. Los administradores deben comprender que hay costos asociados con la produccion, distribucion, seguridad, almacenamiento y recuperacion de la informacion. Aunque la informacion se encuentra a nuestro alrededor, no es gratis y su uso es estrategico para posicionar de forma ventajosa a la empresa dentro de un negocio. Condiciones del dato para transformarse en informacion: utilidad, relevancia, interpretable y perceptible. Caracteristicas de la informacion: transportabilidad, ilimitada, subjetividad y significativa para la toma de decisiones.";

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

  async generateQuiz(): Promise<QuizQuestion[]> {
    if (!env.openRouterApiKey) {
      throw new ValidationError("OPENROUTER_API_KEY no esta configurada");
    }

    const prompt = `
Lee y comprende el siguiente texto:
${chapter}

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

    return normalizeQuiz(parsed);
  }
}

export default new AiService();
