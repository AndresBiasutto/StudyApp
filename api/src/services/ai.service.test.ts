const sendMock = jest.fn();

jest.mock("@openrouter/sdk", () => ({
  OpenRouter: jest.fn().mockImplementation(() => ({
    chat: {
      send: sendMock,
    },
  })),
}));

import aiService from "../services/ai.service";

describe("AiService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a normalized array with 4 questions", async () => {
    sendMock.mockResolvedValue({
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
    });

    const result = await aiService.generateQuiz();

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      question: "Pregunta 1",
      options: ["A", "B", "C"],
      correctAnswer: "B",
    });
  });

  it("should accept wrapped payload under exam", async () => {
    sendMock.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              exam: [
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
          },
        },
      ],
    });

    const result = await aiService.generateQuiz();

    expect(result).toHaveLength(4);
    expect(result[3].question).toBe("Pregunta 4");
  });
});
