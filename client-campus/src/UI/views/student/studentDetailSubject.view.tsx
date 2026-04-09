import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PiExam } from "react-icons/pi";
import { FiChevronDown, FiLink, FiMenu, FiVideo, FiX } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../../hooks/UseStore.hook";
import { fetchChapterById } from "../../../store/slices/chapterSlice/chapter.thunk";
import { clearSelectedChapter } from "../../../store/slices/chapterSlice/chapter.slice";
import { fetchMyStudentChapterExamResult, fetchStudentChapterExam } from "../../../store/slices/studentExamSlice/studentExam.thunk";
import { clearStudentExamState } from "../../../store/slices/studentExamSlice/studentExam.slice";
import { fetchSubjectById } from "../../../store/slices/subjectSlice/subject.thunk";
import { openModal, setModalContent } from "../../../store/slices/uiSlice";
import Button from "../../components/atoms/button.atom";
import ButtonCircle from "../../components/atoms/buttonCircle.atom";
import EditorCard from "../../components/atoms/editorCard.atom";
import H2 from "../../components/atoms/h2.atom";
import H3 from "../../components/atoms/h3.atom";
import Ptxt from "../../components/atoms/P.atom";
import Carousel from "../../components/molecules/carousel.molecule";
import ChapterHeader from "../../components/molecules/chapterReader/chapterHeader.molecule";
import Spinner from "../../components/molecules/spinner.molecule";

const StudentDetailSubject = () => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const [isIndexOpen, setIsIndexOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false,
  );
  const { selected, loadingSelected, error } = useAppSelector(
    (state) => state.subjects,
  );
  const { selected: selectedChapter, loading: loadingChapter } = useAppSelector(
    (state) => state.chapters,
  );
  const { result: examResult } = useAppSelector((state) => state.studentExam);

  useEffect(() => {
    if (id_subject) {
      dispatch(fetchSubjectById(id_subject));
    }

    return () => {
      dispatch({ type: "subjects/clearSelectedSubject" });
      dispatch(clearSelectedChapter());
      dispatch(clearStudentExamState());
    };
  }, [dispatch, id_subject]);

  const handleSelectChapter = (id_chapter: string) => {
    dispatch(fetchChapterById(id_chapter));

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsIndexOpen(false);
    }
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
  }, [selected, selectedChapter, loadingChapter, dispatch]);

  useEffect(() => {
    dispatch(clearStudentExamState());

    if (selectedChapter?.id_chapter) {
      dispatch(fetchMyStudentChapterExamResult(selectedChapter.id_chapter));
    }
  }, [dispatch, selectedChapter?.id_chapter]);

  const handleOpenExam = () => {
    if (!selectedChapter) {
      return;
    }

    dispatch(
      setModalContent({
        type: "STUDENT_EXAM",
        data: selectedChapter,
        title: "ponete a prueba",
      }),
    );
    dispatch(openModal());
    dispatch(fetchStudentChapterExam(selectedChapter.id_chapter));
  };

  if (loadingSelected) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!selected) return <Ptxt text="No se pudo cargar la materia." />;

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full bg-lightPrimary dark:bg-darkPrimary">
      {isIndexOpen && (
        <button
          type="button"
          aria-label="Cerrar indice"
          className="fixed inset-0 top-16 z-20 bg-black/30 lg:hidden"
          onClick={() => setIsIndexOpen(false)}
        />
      )}

      <ButtonCircle
        ariaLabel={isIndexOpen ? "Cerrar indice" : "Abrir indice"}
        icon={isIndexOpen ? <FiX /> : <FiMenu />}
        action={() => setIsIndexOpen((prev) => !prev)}
        className={`fixed top-20 z-40 ${
          isIndexOpen ? "left-62 lg:left-64" : "left-4"
        }`}
      />

      <aside
        className={`fixed left-0 top-16 z-30 flex h-[calc(100vh-4rem)] w-72 flex-col overflow-y-auto border-r border-lightBorder bg-lightPrimary transition-transform duration-300 dark:border-darkBorder dark:bg-darkPrimary ${
          isIndexOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-lightBorder p-4 dark:border-darkBorder">
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
                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold transition-colors hover:bg-lightDetail dark:hover:bg-darkDetail">
                  <span className="font-pixelify text-lightText dark:text-darkText">
                    {unit.order} - {unit.name}
                  </span>
                  <FiChevronDown className="text-lightText transition-transform group-open:rotate-180 dark:text-darkText" />
                </summary>
                <div className="flex flex-col bg-lightPrimary pb-2 dark:bg-darkPrimary">
                  {!unit.createdChapters || unit.createdChapters.length === 0 ? (
                    <div className="px-4 py-2 font-sharetech text-sm text-gray-500">
                      Sin capítulos
                    </div>
                  ) : (
                    unit.createdChapters.map((chapter) => (
                      <button
                        key={chapter.id_chapter}
                        onClick={() => handleSelectChapter(chapter.id_chapter)}
                        className={`px-6 py-2 text-left font-sharetech text-sm transition-colors ${
                          selectedChapter?.id_chapter === chapter.id_chapter
                            ? "border-l-4 border-lightAccent bg-lightDetail font-medium text-lightText dark:border-darkAccent dark:bg-darkDetail dark:text-darkText"
                            : "text-lightText hover:bg-lightDetail/50 dark:text-darkText dark:hover:bg-darkDetail/50"
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

      <main
        className={`min-h-[calc(100vh-4rem)] flex-1 overflow-x-hidden overflow-y-auto bg-lightPrimary p-6 transition-[padding] duration-300 md:p-8 dark:bg-darkPrimary ${
          isIndexOpen ? "lg:pl-64" : ""
        }`}
      >
        <div className="mb-4 pr-16 lg:hidden">
          <Ptxt text="Usa el botón circular para abrir o cerrar el índice del capítulo." />
        </div>

        {loadingChapter ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : !selectedChapter ? (
          <div className="flex h-full items-center justify-center text-center">
            <Ptxt text="Seleccione un capítulo en el índice para comenzar a leer." />
          </div>
        ) : (
          <article className="mx-auto w-full max-w-4xl space-y-8 pb-12">
            <ChapterHeader
              text={selectedChapter.name}
              text2={`Capítulo ${selectedChapter.order ?? "-"}`}
              text3={selectedChapter.description ?? ""}
            />

            {selectedChapter.content_html && (
              <div
                className="prose max-w-none w-full wrap-break-word font-sharetech text-lightText dark:prose-invert dark:text-darkText"
                dangerouslySetInnerHTML={{
                  __html: selectedChapter.content_html,
                }}
              />
            )}

            {selectedChapter.video_url && (
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-2 text-lightAccent dark:text-darkAccent">
                  <FiVideo size={24} />
                  <H3 text="Video de la clase" />
                </div>
                <div className="aspect-video w-full overflow-hidden rounded border border-lightBorder shadow-lg dark:border-darkBorder">
                  <iframe
                    src={selectedChapter.video_url.replace(
                      "youtu.be/",
                      "www.youtube.com/embed/",
                    )}
                    className="h-full w-full border-0"
                    allowFullScreen
                    title={`Video del capítulo ${selectedChapter.name}`}
                  />
                </div>
              </div>
            )}

            {selectedChapter.image_urls &&
              selectedChapter.image_urls.length > 0 && (
                <div className="w-full space-y-4 pt-6">
                  <H3 text="Material Visual" />
                  <Carousel images={selectedChapter.image_urls} />
                </div>
              )}

            {selectedChapter.resource_links &&
              selectedChapter.resource_links.length > 0 && (
                <div className="w-full space-y-4 border-t border-lightBorder pt-8 dark:border-darkBorder">
                  <div className="flex items-center gap-2 text-lightAccent dark:text-darkAccent">
                    <FiLink size={20} />
                    <H3 text="Enlaces de interés" />
                  </div>
                  <ul className="list-inside list-disc space-y-2 pl-2">
                    {selectedChapter.resource_links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block break-all font-sharetech text-lightAccent hover:underline dark:text-darkAccent"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            <div className="pt-8">
              <Button
                btnName="ponete a prueba"
                icon={<PiExam />}
                bgLight="bg-lightLink"
                bgDark="dark:bg-darkLink"
                action={handleOpenExam}
              />
            </div>

            {examResult?.id_chapter === selectedChapter.id_chapter && (
              <EditorCard>
                <Ptxt
                  text={`Nota del capitulo: ${examResult.displayScore}`}
                  aditionalStyle="font-semibold text-lightLink dark:text-darkLink"
                />
              </EditorCard>
            )}
          </article>
        )}
      </main>
    </div>
  );
};

export default StudentDetailSubject;
