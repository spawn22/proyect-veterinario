import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Menu from "../Common/Menu";

function ProtectedRoute() {
  const context = useContext(AuthContext);

  if (!context.loading && !context.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Menu />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default ProtectedRoute;
