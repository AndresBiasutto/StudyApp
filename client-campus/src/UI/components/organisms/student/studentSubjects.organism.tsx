import { useAppSelector } from "../../../../hooks/UseStore.hook";
import GridSection from "../../molecules/gridSection.molecule";
import H3 from "../../atoms/h3.atom";
import Ptxt from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";
import Spinner from "../../molecules/spinner.molecule";
import { NavLink } from "react-router-dom";
import Image from "../../atoms/image.atom";
import avatar from "../../../../assets/monopc.svg";

const StudentSubjects = () => {
  const { selected, loading, error } = useAppSelector((state) => state.auth);
  const enrolledSubjects = selected?.enrolledSubjects ?? [];

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  return (
    <div className="w-full flex flex-col gap-4">
      <H3 text="Mis materias" />
      {enrolledSubjects.length === 0 ? (
        <Ptxt text="TodavÃ­a no tienes materias asignadas." />
      ) : (
        <GridSection gridCols="1">
          {enrolledSubjects.map((subject) => (
            <NavLink
              to={`/dashboard/student/subject/${subject.id_subject}`}
              className={`group w-full h-16 flex items-start justify-start
          gap-2 p-2 cursor-pointer rounded bg-lightDetail dark:bg-darkDetail
         hover:bg-lightAccent dark:hover:bg-darkAccent transition-all`}
            >
              <div className=" w-12 h-12 flex items-center justify-center">
                <Image
                  src={subject.imageUrl || avatar}
                  className="rounded border border-lightBorder dark:border-darkBorder"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <Span text={subject.Grade.name} />
                <H3
                  text={subject.name}
                  aditionalStyle=" group-hover:scale-95"
                />
              </div>
            </NavLink>
          ))}
        </GridSection>
      )}
    </div>
  );
};

export default StudentSubjects;
