import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <span className="loading loading-spinner min-h-screen flex justify-center items-center mx-auto loading-lg"></span>
    );
  }
  if (user) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location }} replace>
      {" "}
    </Navigate>
  );
};

export default PrivateRoute;
