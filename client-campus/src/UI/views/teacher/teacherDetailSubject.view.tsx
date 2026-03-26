import Button from "../../components/atoms/button.atom";
import { useDispatch } from "react-redux";
import SubjectCardHeader from "../../components/molecules/cards/subjectCardHeader.molecule";
import { SiBookstack } from "react-icons/si";
import { setModalContent, toggleModal } from "../../../store/slices/uiSlice";
import imagen from "../../../../public/vite.svg";
import NewUnit from "../../components/organisms/teacher/newUnit.organism";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/UseStore.hook";
import { useEffect } from "react";
import { fetchSubjectById } from "../../../store/slices/subjectSlice/subject.thunk";

const TeacherDetailSubject = () => {
  const { id_subject } = useParams();
  const appDispatch = useAppDispatch();
  const { selected, error } = useAppSelector((state) => state.subjects);
  const dispatch = useDispatch();
  const handleCreateUnit = () => {
    dispatch(toggleModal());
    dispatch(
      setModalContent({
        type: "CREATE_UNIT",
        data: null,
        title: `Nueva Unidad`,
      }),
    );
  };
  useEffect(() => {
    if (id_subject) {
      appDispatch(fetchSubjectById(id_subject));
      return () => {
        appDispatch({ type: "users/clearSelectedUser" });
      };
    }
  }, [id_subject, appDispatch]);
  if (error) return <p>{error}</p>;
  return (
    <div className="w-full flex flex-col justify-start items-end rounded border border-lightBorder dark:border-darkBorder p-4 gap-4">
      <SubjectCardHeader
        title={selected?.name}
        text={selected?.description}
        image={imagen}
      />
      <div className="w-full flex flex-col justify-start items-end gap-4">
        {selected?.createdUnits
          ? selected?.createdUnits.map((unit) => (
              <NewUnit
                id={unit.id_unit}
                title={unit.name}
                text={unit.description}
                unitOrder={unit.order}
                chapters={unit.createdChapters}
              />
            ))
          : ""}
        <Button
          btnName="nueva unidad"
          action={handleCreateUnit}
          icon={<SiBookstack />}
          bgLight="bg-lightAccent"
          bgDark="dark:bg-darkAccent"
        />
      </div>
    </div>
  );
};

export default TeacherDetailSubject;
