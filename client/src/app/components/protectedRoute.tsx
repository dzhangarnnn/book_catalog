import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getIsLoggedIn } from "../store/users";
import { useAppSelector } from "../hooks/redux";

interface Props {
  children: ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  if (!isLoggedIn) {
    return <Navigate to="/login/login" state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
