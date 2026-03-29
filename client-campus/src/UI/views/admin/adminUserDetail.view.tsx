import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/UseStore.hook";
import { useParams } from "react-router-dom";
import { fetchSelectedUser } from "../../../store/slices/userSlice/user.thunk";
import AdminUserDetailAside from "../../components/organisms/admin/adminUserDetailAside.organism";
import type { User } from "../../../BR/domain/entities/user.interface";
import AdminUserDetailPage from "../../components/organisms/admin/adminUserDetailPage.organism";
import Spinner from "../../components/molecules/spinner.molecule";
import { fetchRoles } from "../../../store/slices/roleSlice/role.thunk";
import { clearSelectedUser } from "../../../store/slices/userSlice/user.slice";

const AdminUserDetail = () => {
  const { id_user } = useParams();
  const appDispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.users);
  
  useEffect(() => {
    if (id_user) {
      appDispatch(fetchSelectedUser(id_user));
      return () => {
        appDispatch(clearSelectedUser());
      };
    }
  }, [id_user, appDispatch]);

  const {
    items,
    loading: loadingRoles,
    error: errorRoles,
  } = useAppSelector((state) => state.roles);

  useEffect(() => {
    if (items.length === 0) appDispatch(fetchRoles());
  }, [appDispatch, items]);
  if (loading || loadingRoles) return <Spinner />;
  if (error || errorRoles) return <p>{error || errorRoles}</p>;
  return (
    <div className="w-full min-h-screen p-2 flex flex-col md:flex-row justify-start items-start gap-4">
      <AdminUserDetailAside />
      <AdminUserDetailPage selected={selected as User} items={items} />
    </div>
  );
};

export default AdminUserDetail;
