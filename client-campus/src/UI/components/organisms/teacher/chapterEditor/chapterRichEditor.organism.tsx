import type React from "react";
import type { RefObject } from "react";

import EditorToolbar from "../../../molecules/teacher/editorToolbar.molecule";
import EditorCard from "../../../atoms/editorCard.atom";
import H2 from "../../../atoms/h2.atom";
import Ptxt from "../../../atoms/P.atom";

interface ChapterRichEditorProps {
  editorRef: RefObject<HTMLDivElement | null>;
  applyFormat: (command: string, value?: string) => void;
}

const ChapterRichEditor: React.FC<ChapterRichEditorProps> = ({ editorRef, applyFormat }) => {
  return (
    <EditorCard>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <H2 text="Texto del capitulo" />
            <Ptxt
              text="Editor simple con parrafos, negrita, cursiva y listas."
              aditionalStyle="mt-1"
            />
          </div>
        </div>

        <EditorToolbar applyFormat={applyFormat} />

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="min-h-screen rounded border border-lightBorder dark:border-darkBorder bg-lightPrimary dark:bg-darkPrimary p-4 font-sharetech text-lightText dark:text-darkText outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-darkAccent"
        >
          <p>Empieza a escribir el contenido del capitulo aqui...</p>
        </div>
      </div>
    </EditorCard>
  );
};

export default ChapterRichEditor;
