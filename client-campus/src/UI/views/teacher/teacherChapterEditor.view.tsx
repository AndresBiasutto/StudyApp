import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import Content from "../../components/molecules/content.molecule";
import Button from "../../components/atoms/button.atom";
import { useAppDispatch, useAppSelector } from "../../../hooks/UseStore.hook";
import { fetchChapterById } from "../../../store/slices/chapterSlice/chapter.thunk";
import Spinner from "../../components/molecules/spinner.molecule";
import EditorCard from "../../components/atoms/editorCard.atom";
import type { Chapter } from "../../../BR/domain/entities/chapter.interface";

import ChapterBasicInfo from "../../components/organisms/teacher/chapterEditor/chapterBasicInfo.organism";
import ChapterRichEditor from "../../components/organisms/teacher/chapterEditor/chapterRichEditor.organism";
import ChapterResources from "../../components/organisms/teacher/chapterEditor/chapterResources.organism";
import {
  createResourceItem,
  type ResourceItem,
} from "../../components/organisms/teacher/chapterEditor/chapterResources.types";

interface TeacherChapterEditorFormProps {
  chapter: Chapter;
}

const TeacherChapterEditorForm: React.FC<TeacherChapterEditorFormProps> = ({
  chapter,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [chapterTitle, setChapterTitle] = useState(chapter.name ?? "");
  const [summary, setSummary] = useState(chapter.description ?? "");
  const [images, setImages] = useState<ResourceItem[]>([createResourceItem()]);
  const [links, setLinks] = useState<ResourceItem[]>([createResourceItem()]);
  const [videoUrl, setVideoUrl] = useState("");

  const applyFormat = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-4">
      <ChapterBasicInfo
        chapterDisplayId={chapter.name}
        title={chapterTitle}
        onTitleChange={setChapterTitle}
        summary={summary}
        onSummaryChange={setSummary}
      />

      <ChapterRichEditor editorRef={editorRef} applyFormat={applyFormat} />

      <ChapterResources
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        images={images}
        setImages={setImages}
        links={links}
        setLinks={setLinks}
      />

      <EditorCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button
            btnName="Guardar borrador"
            icon={<FiRefreshCw />}
            bgLight="bg-lightDetail"
            bgDark="dark:bg-darkDetail"
          />
          <Button
            btnName="Publicar contenido"
            icon={<FiPlus />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
          />
        </div>
      </EditorCard>
    </div>
  );
};

const TeacherChapterEditor = () => {
  const { id_chapter } = useParams();
  const dispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.chapters);

  useEffect(() => {
    if (id_chapter) {
      dispatch(fetchChapterById(id_chapter));
    }
  }, [dispatch, id_chapter]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!selected) return <p>No se pudo cargar el capitulo.</p>;

  return (
    <Content title="editor de capitulo">
      <TeacherChapterEditorForm key={selected.id_chapter} chapter={selected} />
    </Content>
  );
};

export default TeacherChapterEditor;
