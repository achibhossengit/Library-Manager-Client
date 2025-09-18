import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../pages/Shared/Spinner";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading)
    return <Spinner title={"Authentication Processing...."}></Spinner>;

  if (!user) return <Navigate to={"/login"} state={'/add-book'}></Navigate>;

  return children;
};

export default PrivateRoute;
