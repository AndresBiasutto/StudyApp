import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing.view";
// import Header from "./components/templates/header.template";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import Register from "./views/register.view";
import Auth from "./components/templates/auth.layout";
import Dashboard from "./components/templates/dashboard.template";
import CreatorDashboard from "./views/creatorDashboard.view";
import StudentDashboard from "./views/studentDashboard.view";
import AdminDashboard from "./views/adminDashboard.view";
import Missing from "./views/missing.view";
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
        <Route path="*" element={<Missing />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route element={<Auth />}>
          <Route path="auth/register" element={<Register />} />
        </Route>
        <Route element={<Dashboard />}>
          <Route
            path="dashboard/creatordashboard"
            element={<CreatorDashboard />}
          />
          <Route
            path="dashboard/studentdashboard"
            element={<StudentDashboard />}
          />
          <Route path="dashboard/admindashboard" element={<AdminDashboard />} />
          <Route
            path="dashboard/admindashboard"
            element={<AdminDashboard />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
