import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing.view";
import Header from "./components/templates/header.template";
import Sidebar from "./components/templates/sidebar.template";
import type { RootState } from "./redux/store/store";
import {  useSelector } from "react-redux";
function App() {
  const { isDark } = useSelector((state: RootState) => state.ui);
  return (
    <div className={`${isDark? "dark": ""} transition-all min-h-screen flex flex-col `}>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
