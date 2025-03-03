import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect to home if not authorized
  }

  return children;
};

export default ProtectedRoute;
