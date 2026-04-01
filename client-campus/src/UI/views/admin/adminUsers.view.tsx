import SearchBar from "../../components/molecules/searchBar.molecule";
import LiHeader from "../../components/molecules/cards/liHeader.molecule";
import LiItem from "../../components/molecules/cards/liItem.molecule";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/UseStore.hook";
import { useEffect } from "react";
import { fetchListedUsers } from "../../../store/slices/userSlice/user.thunk";
import { userToLiItem } from "../../../BR/application/mappers/userToLiItem.mapper";
import Spinner from "../../components/molecules/spinner.molecule";
import Content from "../../components/molecules/content.molecule";

const AdminUsersTab = () => {
  
  const appDispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.users);
  useEffect(() => {
    appDispatch(fetchListedUsers());
  }, [appDispatch]);
  if (loading ) return <Spinner />;
  if (error) return <p>{error}</p>;
  return (
    <Content title="administrar usuarios">
      <div className="w-full grid grid-cols-3 gap-4 items-center mt-4 md:mt-0">
        <div className=" col-span-3 flex justify-center items-center">
          <SearchBar />
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <ul className="w-full flex flex-col items-start justify-start border border-lightBorder dark:border-darkBorder rounded">
          <LiHeader title1={"Nombre"} title2={"Rol"} key={0} />
          {items.map((item, index) => (
            <LiItem key={index} index={index} item={userToLiItem(item)} />
          ))}
        </ul>
      </div>
    </Content>

  );
};

export default AdminUsersTab;
