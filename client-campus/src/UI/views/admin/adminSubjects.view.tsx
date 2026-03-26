import Content from "../../components/molecules/content.molecule";
import SearchBar from "../../components/molecules/searchBar.molecule";
import NewSubject from "../../components/organisms/admin/adminNewSubject.organism";
import AdminSubjectList from "../../components/organisms/admin/adminSubjectList.organism";

const AdminSubjects = () => {
  return (
    <Content title={`Administrar Materias`}>
      <SearchBar />
      <AdminSubjectList />
      <NewSubject />
    </Content>
  );
};

export default AdminSubjects;
