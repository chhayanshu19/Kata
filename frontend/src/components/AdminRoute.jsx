import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user.token) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isStaff) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
