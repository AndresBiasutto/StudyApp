import Button from "../../atoms/button.atom";
import SearchBar from "../../molecules/searchBar.molecule";
import { FaUserPlus } from "react-icons/fa6";
import LiHeader from "../../molecules/cards/liHeader.molecule";
import LiItem from "../../molecules/cards/liItem.molecule";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/UseStore.hook";
import { useEffect, useState } from "react";
import { fetchListedUsers } from "../../../../store/slices/userSlice/user.thunk";
import { userToLiItem } from "../../../../BR/application/mappers/userToLiItem.mapper";

const AdminUsersTab = () => {
  
  const appDispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.users);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [IsOnEdit, setIsOnEdit] = useState(false);
  useEffect(() => {
    appDispatch(fetchListedUsers());
  }, [appDispatch]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="w-full p-2 flex flex-col justify-start items-center gap-4">
      <div className="w-full grid grid-cols-3 gap-4 items-center mt-4 md:mt-0">
        <div className=" col-span-3 md:col-span-2 ">
          <SearchBar />
        </div>
        <div className=" col-span-3 md:col-span-1 ">
        <Button
          btnName={"Invitar Usuario"}
          icon={<FaUserPlus />}
          bgLight="bg-lightSecondary"
          bgDark="dark:bg-darkSecondary"
        />          
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
    </div>
  );
};

export default AdminUsersTab;
