import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/UseStore.hook";
import LiHeader from "../../molecules/cards/liHeader.molecule";
import LiItem from "../../molecules/cards/liItem.molecule";
import SearchBar from "../../molecules/searchBar.molecule";
import { fetchSubjects } from "../../../../store/slices/subjectSlice/subject.thunk";
import { subjectToLiItem } from "../../../../BR/application/mappers/subjectToLiItem.mapper";

const AdminSubjectsTab = () => {
  const { items, loading, error } = useAppSelector((state) => state.subjects);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [IsOnEdit, setIsOnEdit] = useState(false);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchSubjects());
  }, [appDispatch]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className=" p-2 flex flex-col justify-start items-center gap-4">
      <div className="w-full grid grid-cols-3 gap-4 items-center">
        <div className=" col-span-2 ">
          <SearchBar />
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <ul className="w-full flex flex-col items-start justify-start border border-lightBorder dark:border-darkBorder rounded">
          <LiHeader title1={"Materia"} title2={"Estado"} key={0} />
          {items.map((item, index) => (
            <LiItem key={index} index={index} item={subjectToLiItem(item)} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSubjectsTab;
