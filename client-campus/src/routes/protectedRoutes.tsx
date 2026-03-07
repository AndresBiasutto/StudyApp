import { type JSX } from 'react'
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/UseStore.hook';

const ProtectedRoutes = ({ children, role }: { children: JSX.Element; role?: string }) => {
  const { isAuthenticated, selected } = useAppSelector(s => s.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role && selected?.Role?.name !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};


export default ProtectedRoutes