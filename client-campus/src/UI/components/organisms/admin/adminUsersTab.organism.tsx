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
import { fetchUsers } from "../../../../store/slices/userSlice/user.thunk";
// const data = [
//   {
//     id: 0,
//     image:
//       "https://i.pinimg.com/736x/ef/e9/2f/efe92f3d1b4975b89bfc0838b931f419.jpg",
//     name: "juan",
//     last_name: "pérez",
//     role: {
//       id: 1,
//       name: "user",
//     },
//     e_mail: "juan.perez@example.com",
//     contactNumber: "123456789",
//     createdSubjects: [],
//     enroledSubjects: [],
//   },
//   {
//     id: 1,
//     name: "Andrés",
//     image:
//       "https://i.pinimg.com/736x/ef/e9/2f/efe92f3d1b4975b89bfc0838b931f419.jpg",

//     last_name: "Biasutto",
//     role: {
//       id: 1,
//       name: "user",
//     },
//     e_mail: "juan.perez@example.com",
//     contactNumber: "123456789",
//     createdSubjects: [],
//     enroledSubjects: [],
//   },
//   {
//     id: 2,
//     name: "Inásio",
//     image:
//       "https://i.pinimg.com/736x/ef/e9/2f/efe92f3d1b4975b89bfc0838b931f419.jpg",

//     last_name: "Fitipaldi",
//     role: {
//       id: 1,
//       name: "user",
//     },
//     e_mail: "juan.perez@example.com",
//     contactNumber: "123456789",
//     createdSubjects: [],
//     enroledSubjects: [],
//   },
//   {
//     id: 3,
//     name: "Chico",
//     image:
//       "https://i.pinimg.com/736x/ef/e9/2f/efe92f3d1b4975b89bfc0838b931f419.jpg",

//     last_name: "Muchacho",
//     role: {
//       id: 1,
//       name: "user",
//     },
//     e_mail: "juan.perez@example.com",
//     contactNumber: "123456789",
//     createdSubjects: [],
//     enroledSubjects: [],
//   },
//   {
//     id: 4,
//     name: "Aldo",
//     image:
//       "https://i.pinimg.com/736x/ef/e9/2f/efe92f3d1b4975b89bfc0838b931f419.jpg",

//     last_name: "Pobre",
//     role: {
//       id: 1,
//       name: "user",
//     },
//     e_mail: "juan.perez@example.com",
//     contactNumber: "123456789",
//     createdSubjects: [],
//     enroledSubjects: [],
//   },
//   {
//     id: 5,
//     name: "Albitur",
//     image:
//       "https://i.pinimg.com/736x/ef/e9/2f/efe92f3d1b4975b89bfc0838b931f419.jpg",

//     last_name: "Fernunduz",
//     role: {
//       id: 1,
//       name: "user",
//     },
//     e_mail: "juan.perez@example.com",
//     contactNumber: "123456789",
//     createdSubjects: [],
//     enroledSubjects: [],
//   },
// ];

const AdminUsersTab = () => {
  const appDispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.users);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [IsOnEdit, setIsOnEdit] = useState(false);
  useEffect(() => {
    appDispatch(fetchUsers());
  }, [appDispatch]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className=" p-2 flex flex-col justify-start items-center gap-4">
      <div className="w-full grid grid-cols-3 gap-4 items-center">
        <div className=" col-span-2 ">
          <SearchBar />
        </div>
        <Button
          btnName={"Invitar Usuario"}
          icon={<FaUserPlus />}
          bgLight="bg-lightSecondary"
          bgDark="dark:bg-darkSecondary"
        />
      </div>
      <div className="w-full flex items-center justify-end">
        <ul className="w-full flex flex-col items-start justify-start border border-lightBorder dark:border-darkBorder rounded">
          <LiHeader key={0} />
          {items.map((item, index) => (
            <LiItem key={index} index={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminUsersTab;
