import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Menu from "../Common/Menu";
import toast, { Toaster } from "react-hot-toast";

function ProtectedRoute() {
  const context = useContext(AuthContext);
  console.log(context.isAuthenticated, context.loading);

  if (context.loading) return toast.loading("Loading...", { duration: 2000 });

  if (!context.loading && !context.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Menu />
      <Toaster />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
