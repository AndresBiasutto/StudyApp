import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing/landing.view";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import Dashboard from "./components/templates/dashboard.template";
import Missing from "./views/landing/missing.view";
import AdminUserDetail from "./views/admin/adminUserDetail.view";
import AdminUsersTab from "./views/admin/adminUsers.view";
import { useAppDispatch, useAppSelector } from "../hooks/UseStore.hook";
import { useEffect } from "react";
import AdminHome from "./views/admin/adminHome.view";
import { authenticateMe } from "../store/slices/authSlice/auth.thunk";
import ProtectedRoutes from "../routes/protectedRoutes";
import RedirectOnAuth from "../routes/redirectOnAuth";
import Spinner from "./components/molecules/spinner.molecule";
import TeacherHome from "./views/teacher/teacherHome.view";
import AdminSubjects from "./views/admin/adminSubjects.view";
import TeacherDetailSubject from "./views/teacher/teacherDetailSubject.view";
import StudentHome from "./views/student/studentHome.view";
import StudentDetailSubject from "./views/student/studentDetailSubject.view";
import TeacherChapterEditor from "./views/teacher/teacherChapterEditor.view";
import Register from "./views/landing/register.view";
import Login from "./views/landing/login.view";
import LandingPageTemplate from "./components/templates/landingPage.template";

function App() {
  const dispatch = useAppDispatch();
  const { isDark } = useSelector((state: RootState) => state.ui);
  const { loading, error, token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(authenticateMe());
    }
  }, [dispatch, token]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className={`${isDark ? "dark" : ""} min-h-screen transition-all`}>
      <RedirectOnAuth />
      <Routes>
        <Route path="*" element={<Missing />} />
        <Route element={<LandingPageTemplate />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<Dashboard />}>
          <Route
            path="dashboard/student/home"
            element={
              <ProtectedRoutes role={"student"}>
                <StudentHome />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/student/subject/:id_subject"
            element={
              <ProtectedRoutes role={"student"}>
                <StudentDetailSubject />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/teacher/home"
            element={
              <ProtectedRoutes role={"teacher"}>
                <TeacherHome />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/teacher/subject/:id_subject"
            element={
              <ProtectedRoutes role={"teacher"}>
                <TeacherDetailSubject />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/teacher/chapter/:id_chapter"
            element={
              <ProtectedRoutes role={"teacher"}>
                <TeacherChapterEditor />
              </ProtectedRoutes>
            }
          />
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
            element={
              <ProtectedRoutes role={"admin"}>
                <AdminUserDetail />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
