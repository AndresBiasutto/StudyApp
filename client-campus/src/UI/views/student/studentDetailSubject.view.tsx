import { useEffect } from "react";
import { useParams } from "react-router-dom";
import H1 from "../../components/atoms/h1.atom";
import H2 from "../../components/atoms/h2.atom";
import Ptxt from "../../components/atoms/P.atom";
import Spinner from "../../components/molecules/spinner.molecule";
import { useAppDispatch, useAppSelector } from "../../../hooks/UseStore.hook";
import { fetchSubjectById } from "../../../store/slices/subjectSlice/subject.thunk";

const StudentDetailSubject = () => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.subjects);

  useEffect(() => {
    if (id_subject) {
      dispatch(fetchSubjectById(id_subject));
    }

    return () => {
      dispatch({ type: "subjects/clearSelectedSubject" });
    };
  }, [dispatch, id_subject]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!selected) return <Ptxt text="No se pudo cargar la materia." />;

  return (
    <section className="w-full min-h-screen rounded border border-lightBorder p-4 dark:border-darkBorder">
      <div className="flex flex-col gap-2 border-b border-lightBorder pb-4 dark:border-darkBorder">
        <Ptxt text={selected.Grade?.name ?? "Sin año"} />
        <H1 text={selected.name} />
        <Ptxt text={selected.description ?? "Esta materia no tiene descripción."} />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <H2 text="Contenido de la materia" />

        {!selected.createdUnits || selected.createdUnits.length === 0 ? (
          <Ptxt text="Esta materia todavía no tiene unidades cargadas." />
        ) : (
          selected.createdUnits.map((unit) => (
            <article
              key={unit.id_unit}
              className="rounded border border-lightBorder p-4 dark:border-darkBorder"
            >
              <div className="flex flex-col gap-1">
                <Ptxt text={`Unidad ${unit.order ?? "-"}`} />
                <H2 text={unit.name} />
                <Ptxt text={unit.description ?? "Sin descripción"} />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {!unit.createdChapters || unit.createdChapters.length === 0 ? (
                  <Ptxt text="Esta unidad aún no tiene capítulos." />
                ) : (
                  unit.createdChapters.map((chapter) => (
                    <div
                      key={chapter.id_chapter}
                      className="rounded bg-lightDetail p-3 dark:bg-darkDetail"
                    >
                      <Ptxt text={`Capítulo ${chapter.order ?? "-"}`} />
                      <H2 text={chapter.name} />
                      <Ptxt text={chapter.description ?? "Sin descripción"} />
                    </div>
                  ))
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default StudentDetailSubject;
