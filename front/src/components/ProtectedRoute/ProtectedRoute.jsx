import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Menu from "../Common/Menu";
import Footer from "../Common/Footer";
import toast from "react-hot-toast";
function ProtectedRoute() {
  const context = useContext(AuthContext);
  console.log(
    "Loading: ",
    context.loading,
    "Autenticated: ",
    context.isAuthenticated
  );
  if (!context.loading && !context.isAuthenticated) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Menu />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default ProtectedRoute;
