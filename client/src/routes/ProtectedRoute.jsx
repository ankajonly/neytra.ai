import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader } from '../components/common/Loader';
import { useAuthStore } from '../store/authStore';

export function ProtectedRoute() {
  const location = useLocation();
  const { status, isAuthenticated } = useAuthStore((state) => ({
    status: state.status,
    isAuthenticated: state.isAuthenticated,
  }));

  if (status === 'loading') {
    return <Loader fullScreen label="Loading secure workspace" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}