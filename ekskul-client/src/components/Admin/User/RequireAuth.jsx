import useAuth from "../../../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const { role } = jwtDecode(auth.accessToken);
  const location = useLocation();

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
