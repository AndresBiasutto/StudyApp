import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/UseStore.hook";
import { useParams } from "react-router-dom";
import { fetchSelectedUser } from "../../../../store/slices/userSlice/user.thunk";
import H2 from "../../atoms/h2.atom";
import H3 from "../../atoms/h3.atom";
import P from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";
import LiHeader from "../../molecules/cards/liHeader.molecule";
import LiItem from "../../molecules/cards/liItem.molecule";
import { subjectToLiItem } from "../../../../BR/application/mappers/subjectToLiItem.mapper";

const AdminUserDetail = () => {
  const { id_user } = useParams();
  const appDispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.users);
  useEffect(() => {
    if (id_user) {
      appDispatch(fetchSelectedUser(id_user));
      return ()=> {
        // Clean up selected user on unmount
        appDispatch({ type: 'users/clearSelectedUser' });
      }
    }
  }, [id_user, appDispatch]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="w-full min-h-screen p-2 flex flex-col md:flex-row justify-start items-start gap-4">
      <div className=" w-full md:w-64 md:h-screen p-2 flex flex-col items-center justify-start gap-4 border rounded border-lightBorder dark:border-darkBorder">
        <img className=" w-32 h-32 rounded-full" src={selected?.image} />
        <H2 text={`${selected?.name} ${selected?.last_name}`} />
        <H3 text={`${selected?.Role.name}`} />
        <div className="w-full flex flex-col justify-start items-center">
          <div className="w-full flex flex-col justify-center items-start overflow-clip py-2">
            <Span text={"E-mail:"} />
            <P text={`${selected?.e_mail}`} />
          </div>
          <div className="w-full flex flex-col justify-center items-start overflow-clip py-2">
            <Span text={"contacto:"} />
            <P text={`${selected?.contact_number}`} />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <div className=" w-full p-2 flex flex-col items-center justify-start gap-4 border rounded border-lightBorder dark:border-darkBorder">
          <div className="w-full flex flex-col  justify-center items-start overflow-clip py-2">
            <Span text={"Bio:"} />
            <P aditionalStyle={"text-wrap"} text={`${selected?.description}`} />
          </div>
        </div>
        <div className=" w-full p-2 flex flex-col items-center justify-start gap-4 border rounded border-lightBorder dark:border-darkBorder">
          <ul className="w-full flex flex-col items-start justify-start border border-lightBorder dark:border-darkBorder rounded">
            <LiHeader title1={`materias de ${selected?.name}`} title2={"Estado"} key={0} />
            {selected?.subjects?.map((item, index) => (
              
              <LiItem key={index} index={index} item={subjectToLiItem(item)} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;
