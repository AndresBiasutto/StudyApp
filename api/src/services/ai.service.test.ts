jest.mock("../repositories/chapter.repository", () => ({
  __esModule: true,
  default: {
    getOne: jest.fn(),
  },
}));

jest.mock("../repositories/exam.repository", () => ({
  __esModule: true,
  default: {
    getByChapterId: jest.fn(),
    saveByChapterId: jest.fn(),
  },
}));

import aiService from "../services/ai.service";
import chapterRepository from "../repositories/chapter.repository";
import examRepository from "../repositories/exam.repository";

describe("AiService", () => {
  const fetchMock = jest.fn();
  const mockChapterRepository = chapterRepository as jest.Mocked<
    typeof chapterRepository
  >;
  const mockExamRepository = examRepository as jest.Mocked<
    typeof examRepository
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it("should return the stored exam if chapter already has one", async () => {
    mockExamRepository.getByChapterId.mockResolvedValue({
      get: () => ({
        id_exam: "exam-1",
        id_chapter: "chapter-1",
        questions: [
          {
            question: "Pregunta 1",
            options: ["A", "B", "C"],
            correctAnswer: "B",
          },
          {
            question: "Pregunta 2",
            options: ["A", "B", "C"],
            correctAnswer: "C",
          },
          {
            question: "Pregunta 3",
            options: ["A", "B", "C"],
            correctAnswer: "A",
          },
          {
            question: "Pregunta 4",
            options: ["A", "B", "C"],
            correctAnswer: "B",
          },
        ],
      }),
    } as never);

    const result = await aiService.generateQuiz("chapter-1");

    expect(result).toHaveLength(4);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should create and persist an exam from chapter content_html", async () => {
    mockExamRepository.getByChapterId.mockResolvedValue(null);
    mockChapterRepository.getOne.mockResolvedValue({
      get: () => ({
        id_chapter: "chapter-1",
        content_html: "<p>Texto de prueba para el capitulo</p>",
      }),
    } as never);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify([
                {
                  question: "Pregunta 1",
                  options: ["A", "B", "C"],
                  correctAnswer: "B",
                },
                {
                  question: "Pregunta 2",
                  options: ["A", "B", "C"],
                  correctAnswer: "C",
                },
                {
                  question: "Pregunta 3",
                  options: ["A", "B", "C"],
                  correctAnswer: "A",
                },
                {
                  question: "Pregunta 4",
                  options: ["A", "B", "C"],
                  correctAnswer: "B",
                },
              ]),
            },
          },
        ],
      }),
    });
    mockExamRepository.saveByChapterId.mockImplementation(
      async (id_chapter, questions) =>
        ({
          get: () => ({
            id_exam: "exam-1",
            id_chapter,
            questions,
          }),
        }) as never,
    );

    const result = await aiService.generateQuiz("chapter-1");

    expect(mockChapterRepository.getOne).toHaveBeenCalledWith("chapter-1");
    expect(mockExamRepository.saveByChapterId).toHaveBeenCalledWith(
      "chapter-1",
      expect.any(Array),
    );
    expect(result).toHaveLength(4);
  });
});
