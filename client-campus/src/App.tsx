import { Route, Routes } from "react-router-dom";
import Landing from "./UI/views/landing.view";
// import Header from "./components/templates/header.template";
import type { RootState } from "./redux/store/store";
import { useSelector } from "react-redux";
import Register from "./UI/views/register.view";
import Auth from "./UI/templates/auth.layout";
import Dashboard from "./UI/templates/dashboard.template";
import CreatorDashboard from "./UI/views/creatorDashboard";
import StudentDashboard from "./UI/views/studentDashboard.view";
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
          <Route path="dashboard/creatordashboard" element={<CreatorDashboard /> } />
          <Route path="dashboard/studentdashboard" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
