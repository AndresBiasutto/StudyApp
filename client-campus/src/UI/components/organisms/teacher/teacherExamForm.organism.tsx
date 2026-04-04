import { LiaRobotSolid } from "react-icons/lia";
import { FiRefreshCw, FiSave } from "react-icons/fi";

import type { Chapter } from "../../../../BR/domain/entities/chapter.interface";
import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import {
  finishSavingExam,
  startSavingExam,
} from "../../../../store/slices/examSlice/exam.slice";
import { generateChapterExam } from "../../../../store/slices/examSlice/exam.thunk";
import { closeModal } from "../../../../store/slices/uiSlice";
import Button from "../../atoms/button.atom";
import EditorCard from "../../atoms/editorCard.atom";
import H2 from "../../atoms/h2.atom";
import Ptxt from "../../atoms/P.atom";

interface TeacherExamFormProps {
  item: Chapter | null;
}

const TeacherExamForm: React.FC<TeacherExamFormProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { generated, loadingGenerate, saving, error } = useAppSelector(
    (state) => state.exam,
  );

  const chapterId = item?.id_chapter;

  const handleThinkAgain = async () => {
    if (!chapterId) {
      return;
    }

    await dispatch(generateChapterExam({ id_chapter: chapterId, force: true }));
  };

  const handleSave = () => {
    dispatch(startSavingExam());
    dispatch(closeModal());
    dispatch(finishSavingExam());
    alert("Examen guardado correctamente");
  };

  if (!chapterId) {
    return (
      <EditorCard className="w-full">
        <Ptxt text="No se encontro el capitulo para generar el examen." />
      </EditorCard>
    );
  }

  if (loadingGenerate) {
    return (
      <EditorCard className="w-full max-w-3xl">
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
          <LiaRobotSolid className="text-6xl text-lightLink dark:text-darkLink" />
          <H2 text="Generando examen" />
          <Ptxt text="Mono robot genera examen por usted" />
        </div>
      </EditorCard>
    );
  }

  if (error) {
    return (
      <EditorCard className="w-full max-w-3xl">
        <div className="flex flex-col gap-4">
          <H2 text="No se pudo generar el examen" />
          <Ptxt
            text={error}
            aditionalStyle="text-lightWarning dark:text-darkWarning"
          />
          <Button
            btnName="pensar de nuevo"
            icon={<FiRefreshCw />}
            bgLight="bg-lightLink"
            bgDark="dark:bg-darkLink"
            action={handleThinkAgain}
          />
        </div>
      </EditorCard>
    );
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <EditorCard>
        <div className="flex flex-col gap-2">
          <H2 text="Examen generado" />
          <Ptxt text="Revise las preguntas y apruebe el examen antes de continuar." />
        </div>
      </EditorCard>

      {generated.map((question, index) => (
        <EditorCard key={`${question.question}-${index}`}>
          <div className="flex flex-col gap-4">
            <H2 text={`Pregunta ${index + 1}`} />
            <Ptxt text={question.question} />
            <div className="flex flex-col gap-2">
              {question.options.map((option) => {
                const isCorrect = option === question.correctAnswer;

                return (
                  <div
                    key={option}
                    className={`rounded border px-3 py-2 font-sharetech text-lightText dark:text-darkText ${
                      isCorrect
                        ? "border-lightLink bg-lightLink/20 dark:border-darkLink dark:bg-darkLink/20"
                        : "border-lightBorder dark:border-darkBorder"
                    }`}
                  >
                    {option}
                  </div>
                );
              })}
            </div>
            <Ptxt
              text={`Respuesta correcta: ${question.correctAnswer}`}
              aditionalStyle="font-semibold text-lightLink dark:text-darkLink"
            />
          </div>
        </EditorCard>
      ))}

      <EditorCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button
            btnName={saving ? "guardando..." : "guardar"}
            icon={<FiSave />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
            action={handleSave}
          />
          <Button
            btnName="pensar de nuevo"
            icon={<FiRefreshCw />}
            bgLight="bg-lightLink"
            bgDark="dark:bg-darkLink"
            action={handleThinkAgain}
          />
        </div>
      </EditorCard>
    </div>
  );
};

export default TeacherExamForm;
