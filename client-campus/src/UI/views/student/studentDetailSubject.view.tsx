import { useEffect } from "react";
import { useParams } from "react-router-dom";
import H2 from "../../components/atoms/h2.atom";
import H3 from "../../components/atoms/h3.atom";
import Ptxt from "../../components/atoms/P.atom";
import Spinner from "../../components/molecules/spinner.molecule";
import { useAppDispatch, useAppSelector } from "../../../hooks/UseStore.hook";
import { fetchSubjectById } from "../../../store/slices/subjectSlice/subject.thunk";
import { fetchChapterById } from "../../../store/slices/chapterSlice/chapter.thunk";
import { clearSelectedChapter } from "../../../store/slices/chapterSlice/chapter.slice";
import ChapterHeader from "../../components/molecules/chapterReader/chapterHeader.molecule";
import Carousel from "../../components/molecules/carousel.molecule";
import { FiChevronDown, FiVideo, FiLink } from "react-icons/fi";

const StudentDetailSubject = () => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector(
    (state) => state.subjects,
  );
  const { selected: selectedChapter, loading: loadingChapter } = useAppSelector(
    (state) => state.chapters,
  );

  useEffect(() => {
    if (id_subject) {
      dispatch(fetchSubjectById(id_subject));
    }

    return () => {
      dispatch({ type: "subjects/clearSelectedSubject" });
      dispatch(clearSelectedChapter());
    };
  }, [dispatch, id_subject]);

  const handleSelectChapter = (id_chapter: string) => {
    dispatch(fetchChapterById(id_chapter));
  };

  useEffect(() => {
    if (selected && selected.createdUnits && selected.createdUnits.length > 0) {
      const firstUnitWithChapters = selected.createdUnits.find(
        (u) => u.createdChapters && u.createdChapters.length > 0,
      );
      if (
        firstUnitWithChapters &&
        firstUnitWithChapters.createdChapters.length > 0 &&
        !selectedChapter &&
        !loadingChapter
      ) {
        dispatch(
          fetchChapterById(firstUnitWithChapters.createdChapters[0].id_chapter),
        );
      }
    }
  }, [selected, dispatch]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!selected) return <Ptxt text="No se pudo cargar la materia." />;

  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)]">
      {/* Sidebar Acordeón */}
      <aside className="hidden md:flex flex-col w-64 border-r border-lightBorder dark:border-darkBorder bg-lightPrimary dark:bg-darkPrimary shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
        <div className="p-4 border-b border-lightBorder dark:border-darkBorder">
          <H2 text={selected.name} />
          <Ptxt text={selected.Grade?.name ?? "Sin año"} />
        </div>

        <div className="flex flex-col">
          {!selected.createdUnits || selected.createdUnits.length === 0 ? (
            <div className="p-4">
              <Ptxt text="Esta materia todavía no tiene unidades cargadas." />
            </div>
          ) : (
            selected.createdUnits.map((unit) => (
              <details
                key={unit.id_unit}
                className="group border-b border-lightBorder dark:border-darkBorder"
              >
                <summary className="p-4 flex items-center justify-between cursor-pointer hover:bg-lightDetail dark:hover:bg-darkDetail transition-colors font-semibold">
                  <span className="text-lightText dark:text-darkText font-pixelify">
                    {unit.order} - {unit.name}
                  </span>
                  <FiChevronDown className="transition-transform group-open:rotate-180 text-lightText dark:text-darkText" />
                </summary>
                <div className="flex flex-col pb-2 bg-lightPrimary dark:bg-darkPrimary">
                  {!unit.createdChapters ||
                  unit.createdChapters.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500 font-sharetech">
                      Sin capítulos
                    </div>
                  ) : (
                    unit.createdChapters.map((chapter) => (
                      <button
                        key={chapter.id_chapter}
                        onClick={() => handleSelectChapter(chapter.id_chapter)}
                        className={`text-left px-6 py-2 text-sm font-sharetech transition-colors ${
                          selectedChapter?.id_chapter === chapter.id_chapter
                            ? "bg-lightDetail dark:bg-darkDetail text-lightText dark:text-darkText font-medium border-l-4 border-lightAccent dark:border-darkAccent"
                            : "hover:bg-lightDetail/50 dark:hover:bg-darkDetail/50 text-lightText dark:text-darkText"
                        }`}
                      >
                        {chapter.order}. {chapter.name}
                      </button>
                    ))
                  )}
                </div>
              </details>
            ))
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-lightPrimary dark:bg-darkPrimary overflow-y-auto overflow-x-hidden min-h-[calc(100vh-4rem)]">
        {/* Mobile Sidebar Toggle - Opcional, pero util */}
        <div className="md:hidden mb-4">
          <Ptxt text="Nota: El índice lateral es visible en pantallas más grandes." />
        </div>

        {loadingChapter ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : !selectedChapter ? (
          <div className="flex items-center justify-center h-full text-center">
            <Ptxt text="Seleccione un capítulo en el índice para comenzar a leer." />
          </div>
        ) : (
          <article className="max-w-4xl mx-auto space-y-8 pb-12 w-full">
            <ChapterHeader
              text={selectedChapter.name}
              text2={`Capítulo ${selectedChapter.order ?? "-"} `}
              text3={selectedChapter.description ?? ""}
            />

            {/* Contenido Principal HTML */}
            {selectedChapter.content_html && (
              <div
                className="prose dark:prose-invert max-w-none font-sharetech wrap-break-word w-full text-lightText dark:text-darkText"
                dangerouslySetInnerHTML={{
                  __html: selectedChapter.content_html,
                }}
              />
            )}

            {/* Video */}
            {selectedChapter.video_url && (
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-2 text-lightAccent dark:text-darkAccent">
                  <FiVideo size={24} />
                  <H3 text="Video de la clase" />
                </div>
                <div className="aspect-video w-full rounded overflow-hidden shadow-lg border border-lightBorder dark:border-darkBorder">
                  <iframe
                    src={selectedChapter.video_url.replace(
                      "youtu.be/",
                      "www.youtube.com/embed/",
                    )}
                    className="w-full h-full border-0"
                    allowFullScreen
                    title={`Video del capítulo ${selectedChapter.name}`}
                  />
                </div>
              </div>
            )}

            {/* Carousel de Imágenes */}
            {selectedChapter.image_urls &&
              selectedChapter.image_urls.length > 0 && (
                <div className="space-y-4 pt-6 w-full">
                  <H3 text="Material Visual" />
                  <Carousel images={selectedChapter.image_urls} />
                </div>
              )}

            {/* Links */}
            {selectedChapter.resource_links &&
              selectedChapter.resource_links.length > 0 && (
                <div className="space-y-4 pt-8 border-t border-lightBorder dark:border-darkBorder w-full">
                  <div className="flex items-center gap-2 text-lightAccent dark:text-darkAccent">
                    <FiLink size={20} />
                    <H3 text="Enlaces de interés" />
                  </div>
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    {selectedChapter.resource_links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-lightAccent dark:text-darkAccent hover:underline break-all font-sharetech inline-block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </article>
        )}
      </main>
    </div>
  );
};

export default StudentDetailSubject;
