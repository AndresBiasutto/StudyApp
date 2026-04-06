import type React from "react";

import { PiExam } from "react-icons/pi";

import type { Chapter } from "../../../../BR/domain/entities/chapter.interface";
import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import {
  setStudentExamAnswer,
} from "../../../../store/slices/studentExamSlice/studentExam.slice";
import { submitStudentChapterExam } from "../../../../store/slices/studentExamSlice/studentExam.thunk";
import { closeModal } from "../../../../store/slices/uiSlice";
import Button from "../../atoms/button.atom";
import EditorCard from "../../atoms/editorCard.atom";
import H2 from "../../atoms/h2.atom";
import Ptxt from "../../atoms/P.atom";

interface StudentExamFormProps {
  item: Chapter | null;
}

const StudentExamForm: React.FC<StudentExamFormProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { questions, selectedAnswers, loadingExam, submitting, error } =
    useAppSelector((state) => state.studentExam);

  const chapterId = item?.id_chapter;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!chapterId) {
      return;
    }

    const answers = questions.map((_, index) => selectedAnswers[index] ?? "");

    const resultAction = await dispatch(
      submitStudentChapterExam({
        id_chapter: chapterId,
        answers,
      }),
    );

    if (submitStudentChapterExam.fulfilled.match(resultAction)) {
      dispatch(closeModal());
    }
  };

  if (!chapterId) {
    return (
      <EditorCard className="w-full">
        <Ptxt text="No se encontro el capitulo para rendir el examen." />
      </EditorCard>
    );
  }

  if (loadingExam) {
    return (
      <EditorCard className="w-full max-w-3xl">
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
          <PiExam className="text-6xl text-lightLink dark:text-darkLink" />
          <H2 text="Preparando examen" />
          <Ptxt text="Cargando las preguntas del capitulo" />
        </div>
      </EditorCard>
    );
  }

  if (error && questions.length === 0) {
    return (
      <EditorCard className="w-full max-w-3xl">
        <div className="flex flex-col gap-4">
          <H2 text="No se pudo cargar el examen" />
          <Ptxt
            text={error}
            aditionalStyle="text-lightWarning dark:text-darkWarning"
          />
        </div>
      </EditorCard>
    );
  }

  return (
    <form className="flex w-full max-w-4xl flex-col gap-4" onSubmit={handleSubmit}>
      <EditorCard>
        <div className="flex flex-col gap-2">
          <H2 text="Ponete a prueba" />
          <Ptxt text="Responde todas las preguntas y envia tu examen para ver la nota." />
        </div>
      </EditorCard>

      {questions.map((question, index) => (
        <EditorCard key={`${question.question}-${index}`}>
          <fieldset className="flex flex-col gap-4">
            <legend className="font-pixelify text-lightText dark:text-darkText">
              {`Pregunta ${index + 1}: ${question.question}`}
            </legend>
            <div className="flex flex-col gap-2">
              {question.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded border border-lightBorder px-3 py-2 font-sharetech text-lightText dark:border-darkBorder dark:text-darkText"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() =>
                      dispatch(setStudentExamAnswer({ index, answer: option }))
                    }
                    className="accent-lightLink dark:accent-darkLink"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </EditorCard>
      ))}

      {error && questions.length > 0 && (
        <EditorCard>
          <Ptxt
            text={error}
            aditionalStyle="text-lightWarning dark:text-darkWarning"
          />
        </EditorCard>
      )}

      <EditorCard>
        <Button
          type="submit"
          btnName={submitting ? "enviando..." : "enviar examen"}
          icon={<PiExam />}
          bgLight="bg-lightLink"
          bgDark="dark:bg-darkLink"
        />
      </EditorCard>
    </form>
  );
};

export default StudentExamForm;
