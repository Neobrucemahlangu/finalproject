

import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const user = getUserFromLocalStorage();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
