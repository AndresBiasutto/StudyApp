import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBold, FaItalic, FaLink, FaListOl, FaListUl, FaVideo } from "react-icons/fa";
import { FiImage, FiPlus, FiRefreshCw, FiType } from "react-icons/fi";
import { MdOutlineHorizontalRule } from "react-icons/md";
import Content from "../../components/molecules/content.molecule";
import H2 from "../../components/atoms/h2.atom";
import Ptxt from "../../components/atoms/P.atom";
import Button from "../../components/atoms/button.atom";
import { useAppDispatch, useAppSelector } from "../../../hooks/UseStore.hook";
import { fetchChapterById } from "../../../store/slices/chapterSlice/chapter.thunk";
import Spinner from "../../components/molecules/spinner.molecule";

interface ResourceItem {
  id: string;
  value: string;
}

const createItem = () => ({
  id: crypto.randomUUID(),
  value: "",
});

const TeacherChapterEditor = () => {
  const { id_chapter } = useParams();
  const editorRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<ResourceItem[]>([createItem()]);
  const [links, setLinks] = useState<ResourceItem[]>([createItem()]);
  const [videoUrl, setVideoUrl] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [summary, setSummary] = useState("");

  const toolbarButtons = useMemo(
    () => [
      { icon: <FiType />, label: "Párrafo", command: "formatBlock", value: "p" },
      { icon: <FaBold />, label: "Negrita", command: "bold" },
      { icon: <FaItalic />, label: "Cursiva", command: "italic" },
      { icon: <FaListUl />, label: "Lista", command: "insertUnorderedList" },
      { icon: <FaListOl />, label: "Lista numerada", command: "insertOrderedList" },
      { icon: <MdOutlineHorizontalRule />, label: "Separador", command: "insertHorizontalRule" },
    ],
    [],
  );

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const applyFormat = (command: string, value?: string) => {
    focusEditor();
    document.execCommand(command, false, value);
  };

  const handleResourceChange = (
    id: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<ResourceItem[]>>,
  ) => {
    setter((current) =>
      current.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  };

  const addResourceField = (
    setter: React.Dispatch<React.SetStateAction<ResourceItem[]>>,
  ) => {
    setter((current) => [...current, createItem()]);
  };

  const removeResourceField = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<ResourceItem[]>>,
  ) => {
    setter((current) =>
      current.length === 1
        ? current.map((item) => (item.id === id ? { ...item, value: "" } : item))
        : current.filter((item) => item.id !== id),
    );
  };
  const dispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.chapters);

  useEffect(() => {
    if (id_chapter) {
      dispatch(fetchChapterById(id_chapter));
    }
  }, [dispatch, id_chapter]);

  useEffect(() => {
    if (selected) {
      setChapterTitle(selected.name ?? "");
      setSummary(selected.description ?? "");
    }
  }, [selected]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  const cardStyles =
    "w-full rounded border border-lightBorder dark:border-darkBorder " +
    "bg-lightSecondary dark:bg-darkSecondary p-4";

  const inputStyles =
    "w-full rounded border border-lightBorder dark:border-darkBorder " +
    "bg-lightPrimary dark:bg-darkPrimary px-3 py-2 font-sharetech " +
    "text-lightText dark:text-darkText outline-none focus:ring-2 " +
    "focus:ring-lightAccent dark:focus:ring-darkAccent";

  const toolbarButtonStyles =
    "rounded border border-lightBorder dark:border-darkBorder " +
    "bg-lightDetail dark:bg-darkDetail px-3 py-2 text-lightText " +
    "dark:text-darkText transition-all hover:bg-lightAccent " +
    "dark:hover:bg-darkAccent";

  return (
    <Content title="editor de capitulo">
      <div className="w-full max-w-6xl flex flex-col gap-4">
        <section className={cardStyles}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="w-full">
              <H2 text={`Capitulo ${selected?.name ?? "sin id"}`} />
              <Ptxt
                text="Aqui el profesor puede redactar el contenido del capitulo y adjuntar recursos."
                aditionalStyle="mt-2"
              />
            </div>
            <div className="w-full md:max-w-sm">
              <label className="mb-2 block font-pixelify text-lightText dark:text-darkText">
                Titulo visible del capitulo
              </label>
              <input
                value={chapterTitle}
                onChange={(event) => setChapterTitle(event.target.value)}
                placeholder="Ej: Introduccion a funciones"
                className={inputStyles}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block font-pixelify text-lightText dark:text-darkText">
              Resumen corto
            </label>
            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              rows={3}
              placeholder="Una descripcion breve para ubicar al alumno."
              className={`${inputStyles} resize-none`}
            />
          </div>
        </section>

        <section className={cardStyles}>
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

            <div className="flex flex-wrap gap-2">
              {toolbarButtons.map((button) => (
                <button
                  key={button.label}
                  type="button"
                  className={toolbarButtonStyles}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyFormat(button.command, button.value)}
                  title={button.label}
                >
                  <span className="flex items-center gap-2 font-pixelify">
                    {button.icon}
                    {button.label}
                  </span>
                </button>
              ))}
            </div>

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-screen rounded border border-lightBorder dark:border-darkBorder bg-lightPrimary dark:bg-darkPrimary p-4 font-sharetech text-lightText dark:text-darkText outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-darkAccent"
            >
              <p>Empieza a escribir el contenido del capitulo aqui...</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <article className={cardStyles}>
            <div className="mb-3 flex items-center gap-2">
              <FaVideo className="text-lightText dark:text-darkText" />
              <H2 text="Video" />
            </div>
            <input
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              placeholder="https://youtube.com/..."
              className={inputStyles}
            />
            <Ptxt
              text="Puedes pegar un enlace de YouTube, Vimeo o cualquier video externo."
              aditionalStyle="mt-3"
            />
          </article>

          <article className={cardStyles}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FiImage className="text-lightText dark:text-darkText" />
                <H2 text="Imagenes" />
              </div>
              <button
                type="button"
                className={toolbarButtonStyles}
                onClick={() => addResourceField(setImages)}
              >
                <span className="flex items-center gap-2 font-pixelify">
                  <FiPlus />
                  Agregar
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {images.map((item, index) => (
                <div key={item.id} className="flex gap-2">
                  <input
                    value={item.value}
                    onChange={(event) =>
                      handleResourceChange(item.id, event.target.value, setImages)
                    }
                    placeholder={`URL de imagen ${index + 1}`}
                    className={inputStyles}
                  />
                  <button
                    type="button"
                    className={toolbarButtonStyles}
                    onClick={() => removeResourceField(item.id, setImages)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className={cardStyles}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FaLink className="text-lightText dark:text-darkText" />
                <H2 text="Links utiles" />
              </div>
              <button
                type="button"
                className={toolbarButtonStyles}
                onClick={() => addResourceField(setLinks)}
              >
                <span className="flex items-center gap-2 font-pixelify">
                  <FiPlus />
                  Agregar
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {links.map((item, index) => (
                <div key={item.id} className="flex gap-2">
                  <input
                    value={item.value}
                    onChange={(event) =>
                      handleResourceChange(item.id, event.target.value, setLinks)
                    }
                    placeholder={`URL de referencia ${index + 1}`}
                    className={inputStyles}
                  />
                  <button
                    type="button"
                    className={toolbarButtonStyles}
                    onClick={() => removeResourceField(item.id, setLinks)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={cardStyles}>
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
        </section>
      </div>
    </Content>
  );
};

export default TeacherChapterEditor;
