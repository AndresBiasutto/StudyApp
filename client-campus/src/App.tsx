import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing.view";
import Header from "./components/templates/header.template";
import type { RootState } from "./redux/store/store";
import { useSelector } from "react-redux";
import Register from "./views/register.view";
import Auth from "./layouts/auth.layout";
import Dashboard from "./layouts/dashboard.layout";
import CreatorDashboard from "./views/creatorDashboard";
import StudentDashboard from "./components/templates/student.template";
function App() {
  const { isDark } = useSelector((state: RootState) => state.ui);
  return (
    <div
      className={`${
        isDark ? "dark" : ""
      } transition-all min-h-screen flex flex-col `}
    >
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route element={<Auth />}>
          <Route path="auth/register" element={<Register />} />
        </Route>
        <Route element={<Dashboard />}>
          <Route path="dashboard/userdashboard" element={<CreatorDashboard />} />
          <Route path="dashboard/studentdashboard" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
