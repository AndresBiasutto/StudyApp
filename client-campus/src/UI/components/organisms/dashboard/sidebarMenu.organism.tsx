import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { toggleSidebar } from "../../../../store/slices/uiSlice";
import CloseBackground from "../../molecules/closeBackground.molecule";
import Navigation from "../../molecules/navigation.molecule";
import { useEffect } from "react";
import { useAppSelector } from "../../../../hooks/UseStore.hook";
import ButtonRounded from "../../atoms/buttonRounded.atom";
import { RiMenuFold3Fill } from "react-icons/ri";

const user = [
  { navLink: "/", name: "inicio" },
  { navLink: "/dashboard/create", name: "crear" },
  { navLink: "/dashboard/study", name: "estudiar" },
  { navLink: "/dashboard/admin/users", name: "administrar" },
];
const admin = [
  { name: "home", navLink: "/dashboard/admin/home" },
  { name: "administrar usuarios", navLink: "/dashboard/admin/users" },
  { name: "administrar materias", navLink: "/dashboard/admin/subjects" },
];
const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const { selected, loading, error } = useAppSelector((state) => state.auth);
  useEffect(() => {}, [selected]);
  
  const navUser = () => {
    switch (selected?.Role?.name) {
      case "user":
        return user;
      case "admin":
        return admin;
      case "teacher":
        return user;
      default:
        return user;
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <CloseBackground
        isOpen={sidebarOpen}
        action={() => dispatch(toggleSidebar())}
      />
      <aside
        className={`fixed inset-y-0 z-50 left-0 top-0 w-64 overflow-y-auto bg-lightSecondary dark:bg-darkSecondary transform transition duration-300  ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 md:h-12 w-full px-6 flex items-center justify-start">
          <ButtonRounded
            btnName="mostrar menu"
            action={() => dispatch(toggleSidebar())}
            icon={<RiMenuFold3Fill />}
            bgLight="bg-lightAccent"
            bgDark="dark:bg-darkAccent"
          />
        </div>
        <Navigation
          navInfo={navUser()}
          action={() => dispatch(toggleSidebar())}
        />
      </aside>
    </>
  );
};

export default Sidebar;
