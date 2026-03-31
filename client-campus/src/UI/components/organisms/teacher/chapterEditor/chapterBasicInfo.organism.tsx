import type React from "react";
import EditorCard from "../../../atoms/editorCard.atom";
import H2 from "../../../atoms/h2.atom";
import Ptxt from "../../../atoms/P.atom";
import EditorInput from "../../../atoms/editorInput.atom";
import Textarea from "../../../atoms/textarea.atom";


interface ChapterBasicInfoProps {
  chapterDisplayId: string | undefined;
  title: string;
  onTitleChange: (value: string) => void;
  summary: string;
  onSummaryChange: (value: string) => void;
}

const ChapterBasicInfo: React.FC<ChapterBasicInfoProps> = ({
  chapterDisplayId,
  title,
  onTitleChange,
  summary,
  onSummaryChange,
}) => {
  return (
    <EditorCard>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="w-full">
          <H2 text={`Capitulo ${chapterDisplayId ?? "sin id"}`} />
          <Ptxt
            text="Aqui el profesor puede redactar el contenido del capitulo y adjuntar recursos."
            aditionalStyle="mt-2"
          />
        </div>
        <div className="w-full md:max-w-sm">
          <label className="mb-2 block font-pixelify text-lightText dark:text-darkText">
            Titulo visible del capitulo
          </label>
          <EditorInput
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Ej: Introduccion a funciones"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block font-pixelify text-lightText dark:text-darkText">
          Resumen corto
        </label>
        <Textarea
          value={summary}
          onChange={(event) => onSummaryChange(event.target.value)}
          placeholder="Una descripcion breve para ubicar al alumno."
          rows={3}
        />
      </div>
    </EditorCard>
  );
};

export default ChapterBasicInfo;
