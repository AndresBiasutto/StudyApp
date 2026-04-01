import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/UseStore.hook";

const RedirectOnAuth = () => {
  const { isAuthenticated, selected } = useAppSelector(s => s.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
if (!isAuthenticated || !selected?.Role?.name) return;
// permitir que la redirección ocurra desde páginas públicas
const publicPaths = ["/", "/login", "/register"];
if (!publicPaths.includes(location.pathname)) return;

    switch (selected.Role.name) {
      case "admin":
        navigate("/dashboard/admin/home", { replace: true });
        break;
      case "teacher":
        navigate("/dashboard/teacher/home", { replace: true });
        break;
      case "student":
        navigate("/dashboard/student/home", { replace: true });
        break;
      case "user":
        navigate("/dashboard/study", { replace: true });
        break;
    }
  }, [isAuthenticated, selected?.Role?.name, location.pathname, navigate]);

  return null;
};

export default RedirectOnAuth;
