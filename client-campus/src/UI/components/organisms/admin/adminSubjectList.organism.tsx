import { useEffect } from "react";
import { fetchSubjects } from "../../../../store/slices/subjectSlice/subject.thunk";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/UseStore.hook";

import SubjectUl from "./adminSubjectUl.organism";
import Spinner from "../../molecules/spinner.molecule";

const AdminSubjectList = () => {
  const { items, loading, error } = useAppSelector((state) => state.subjects);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(fetchSubjects());
  }, [appDispatch]);
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  return (
      <ul className="w-full max-h-96 overflow-y-scroll flex flex-col items-start gap-2 justify-start border border-lightBorder dark:border-darkBorder rounded">
        {items.map((item , index) => (
          <SubjectUl key={index} item={item} />
        ))}
      </ul>
  );
};

export default AdminSubjectList;
