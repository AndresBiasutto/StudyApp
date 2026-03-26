import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/UseStore.hook";
import H2 from "../../components/atoms/h2.atom";
import Content from "../../components/molecules/content.molecule";
import AdminTools from "../../components/organisms/admin/adminTools.organism";

const AdminHome = () => {
  const { selected, loading, error } = useAppSelector((state) => state.auth);
  useEffect(() => {
  }, [selected])
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <Content title="">
        <H2 text={`Hola ${selected?.name}, ¿Qué vas a hacér hoy?`} />
        <AdminTools />
      </Content>
    </div>
  );
};

export default AdminHome;
