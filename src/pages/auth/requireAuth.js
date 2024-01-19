import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth = ({ allowedRoles }) => {
  const [cookies, setCookie] = useCookies();
  // console.log('cookies usertype',cookies.usertype);
  const location = useLocation();
  return cookies.usertype?.includes(allowedRoles) ? (
    <Outlet />
  ) : cookies.token1 ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
