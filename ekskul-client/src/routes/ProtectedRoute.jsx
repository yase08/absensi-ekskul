import { Navigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const ProtectedRoute = ({ children }) => {
  const authenticated = useLogin();
  console.log(authenticated);
  return authenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
