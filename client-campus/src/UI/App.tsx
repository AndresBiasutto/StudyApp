import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing.view";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import Dashboard from "./components/templates/dashboard.template";
import StudentDashboard from "./views/studentDashboard.view";
import Missing from "./views/missing.view";
import AdminUserDetail from "./views/adminUserDetail.view";
import AdminUsersTab from "./views/adminUsers.view";
import { useAppDispatch, useAppSelector } from "../hooks/UseStore.hook";
import { useEffect } from "react";
import AdminHome from "./views/adminHome.view";
import { authenticateMe } from "../store/slices/authSlice/auth.thunk";
import ProtectedRoutes from "../routes/protectedRoutes";
import RedirectOnAuth from "../routes/redirectOnAuth";
import Spinner from "./components/molecules/spinner.molecule";
import TeacherHome from "./views/teacherHome.view";
import AdminSubjects from "./views/AdminSubjects.view";

function App() {
  const dispatch = useAppDispatch();
  const { isDark } = useSelector((state: RootState) => state.ui);
  const { loading, error, token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(authenticateMe(token));
    }
  }, [dispatch, token]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className={`${isDark ? "dark" : ""} min-h-screen`}>
      <RedirectOnAuth />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Missing />} />
        <Route element={<Dashboard />}>
          <Route path="dashboard/study" element={<StudentDashboard />} />
          <Route
            path="dashboard/teacher/home"
            element={
              <ProtectedRoutes role={"teacher"}>
                <TeacherHome />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="dashboard/admin/home"
            element={
              <ProtectedRoutes role={"admin"}>
                <AdminHome />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/admin/users"
            element={
              <ProtectedRoutes role={"admin"}>
                <AdminUsersTab />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/admin/subjects"
            element={
              <ProtectedRoutes role={"admin"}>
                <AdminSubjects />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/admin/users/:id_user"
            element={<AdminUserDetail />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
