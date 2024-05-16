import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Shared/Loading/Loading";
import { AuthState } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = AuthState();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ form: location, replace: true }}></Navigate>
  );
};

export default PrivateRoute;
