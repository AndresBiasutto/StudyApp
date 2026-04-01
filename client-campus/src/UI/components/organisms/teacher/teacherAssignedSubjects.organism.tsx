import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/UseStore.hook";
import Spinner from "../../molecules/spinner.molecule";
import GridSection from "../../molecules/gridSection.molecule";
import H3 from "../../atoms/h3.atom";
import Span from "../../atoms/span.atom";
import Image from "../../atoms/image.atom";
import avatar from "../../../../assets/monopc.svg"

const TeacherAssignedSubjects = () => {
  const { selected, loading, error } = useAppSelector((state) => state.auth);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  return (
    <GridSection gridCols="2">
      {selected?.subjects?.map((subject) => (
        <NavLink
          to={`/dashboard/teacher/subject/${subject.id_subject}`}
          className={`group w-full h-16 flex items-start justify-start
          gap-2 p-2 cursor-pointer rounded bg-lightAccent dark:bg-darkAccent
         hover:bg-lightDetail dark:hover:bg-darkDetail transition-all`}
        >
          <div className=" w-12 h-12 flex items-center justify-center">
            <Image src={subject.imageUrl || avatar} className="rounded border border-lightBorder dark:border-darkBorder" alt="" />
          </div>
          <div className="flex flex-col justify-start items-start">
            <Span text={subject?.Grade?.name} />
            <H3 text={subject.name} aditionalStyle=" group-hover:scale-95" />
          </div>
        </NavLink>
      ))}
    </GridSection>
  );
};

export default TeacherAssignedSubjects;
