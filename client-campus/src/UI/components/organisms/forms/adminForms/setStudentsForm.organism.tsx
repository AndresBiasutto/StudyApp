import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import type { Subject } from "../../../../../BR/domain/entities/subject.interface";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/UseStore.hook";
import { fetchStudents } from "../../../../../store/slices/userSlice/user.thunk";
import { updateSubject } from "../../../../../store/slices/subjectSlice/subject.thunk";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";
import Spinner from "../../../molecules/spinner.molecule";

interface SetStudentsFormProps {
  item: Subject | null;
}

const SetStudentsForm: React.FC<SetStudentsFormProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { students, loadingStudents, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  useEffect(() => {
    setSelectedStudents(item?.students?.map((student) => student.id_user) ?? []);
  }, [item]);

  const sortedStudents = [...students].sort((a, b) =>
    `${a.name} ${a.last_name}`.localeCompare(`${b.name} ${b.last_name}`),
  );

  const toggleStudentSelection = (id_user: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id_user)
        ? prev.filter((studentId) => studentId !== id_user)
        : [...prev, id_user],
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      updateSubject({
        id: item?.id_subject || "",
        data: { student_ids: selectedStudents },
      }),
    );

    if (updateSubject.fulfilled.match(result)) {
      setUpdateSuccess(true);

      setTimeout(() => {
        dispatch(toggleModal());
        setUpdateSuccess(false);
      }, 1500);
    }
  };

  if (loadingStudents) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <form
      onSubmit={onSubmit}
      className="w-full bg-lightSecondary dark:bg-darkSecondary p-6 rounded-md border border-lightBorder dark:border-darkBorder"
    >
      <div className="flex flex-col gap-4">
        <Ptxt
          text={`Selecciona los estudiantes que quieres inscribir en ${item?.name ?? "la materia"}.`}
        />
        <Ptxt text={`Estudiantes disponibles: ${sortedStudents.length}`} />

        {sortedStudents.length === 0 ? (
          <Ptxt text="No hay estudiantes disponibles para asignar." />
        ) : (
          <div className="max-h-72 overflow-y-auto rounded border border-lightBorder dark:border-darkBorder">
            {sortedStudents.map((student) => {
              const checked = selectedStudents.includes(student.id_user);

              return (
                <label
                  key={student.id_user}
                  className="flex cursor-pointer items-center gap-3 border-b border-lightBorder px-3 py-3 last:border-b-0 dark:border-darkBorder"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleStudentSelection(student.id_user)}
                    className="h-4 w-4 accent-lightAccent dark:accent-darkAccent"
                  />
                  <div className="flex flex-col">
                    <span className="font-pixelify text-lightText dark:text-darkText">
                      {student.name} {student.last_name}
                    </span>
                    <span className="text-sm text-lightText/70 dark:text-darkText/70">
                      {student.e_mail}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        <Button
          btnName="Guardar estudiantes"
          type="submit"
          bgLight="bg-lightDetail"
          bgDark="dark:bg-darkDetail"
          icon={<CiEdit />}
        />

        {updateSuccess && (
          <div className="mt-2 flex justify-center">
            <Ptxt
              aditionalStyle="bg-lightLink dark:bg-darkLink rounded p-1"
              text="Estudiantes asignados exitosamente"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default SetStudentsForm;
