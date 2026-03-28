import { useEffect } from "react";
import { fetchStudents } from "../../../../../store/slices/userSlice/user.thunk";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/UseStore.hook";
import Spinner from "../../../molecules/spinner.molecule";
import Ptxt from "../../../atoms/P.atom";

const SetStudentsForm = () => {
  const dispatch = useAppDispatch();
  const { students, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col gap-2">
      <Ptxt text={`Estudiantes encontrados: ${students.length}`} />
      {students.map((student) => (
        <Ptxt
          key={student.id_user}
          text={`${student.name} ${student.last_name}`}
        />
      ))}
    </div>
  );
};

export default SetStudentsForm;
