import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const isAuth = token ? true : false;
  const navigate = useNavigate();

  return isAuth ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
