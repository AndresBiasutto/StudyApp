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
  publishChapterContent,
  saveChapterDraft,
} from "../../../store/slices/chapterSlice/chapter.thunk";
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
  const dispatch = useAppDispatch();
  const editorRef = useRef<HTMLDivElement>(null);
  const [chapterTitle, setChapterTitle] = useState(chapter.name ?? "");
  const [summary, setSummary] = useState(chapter.description ?? "");
  const [images, setImages] = useState<ResourceItem[]>(
    chapter.image_urls && chapter.image_urls.length > 0
      ? chapter.image_urls.map((url) => ({ id: crypto.randomUUID(), value: url }))
      : [createResourceItem()]
  );
  const [links, setLinks] = useState<ResourceItem[]>(
    chapter.resource_links && chapter.resource_links.length > 0
      ? chapter.resource_links.map((link) => ({ id: crypto.randomUUID(), value: link }))
      : [createResourceItem()]
  );
  const [videoUrl, setVideoUrl] = useState(chapter.video_url ?? "");

  const applyFormat = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  useEffect(() => {
    if (editorRef.current && chapter.content_html) {
      editorRef.current.innerHTML = chapter.content_html;
    }
  }, [chapter.content_html]);

  const getFormData = () => ({
    name: chapterTitle,
    description: summary,
    content_html: editorRef.current?.innerHTML || "",
    video_url: videoUrl.trim() !== "" ? videoUrl : null,
    image_urls: images.map((i) => i.value).filter((val) => val.trim() !== ""),
    resource_links: links.map((l) => l.value).filter((val) => val.trim() !== ""),
  });

  const handleSaveDraft = async () => {
    try {
      await dispatch(
        saveChapterDraft({ id: chapter.id_chapter, data: getFormData() })
      ).unwrap();
      alert("Borrador guardado correctamente");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al guardar borrador";
      alert(message);
    }
  };

  const handlePublish = async () => {
    try {
      await dispatch(
        publishChapterContent({ id: chapter.id_chapter, data: getFormData() })
      ).unwrap();
      alert("Capitulo publicado correctamente");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al publicar capitulo";
      alert(message);
    }
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
            action={handleSaveDraft}
          />
          <Button
            btnName="Publicar contenido"
            icon={<FiPlus />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
            action={handlePublish}
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
