import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Menu from "../Common/Menu";
import Footer from "../Common/Footer";
import toast from "react-hot-toast";
function ProtectedRoute() {
  const context = useContext(AuthContext);

  // Si el usuario aún no ha sido autenticado y la página no está en proceso de carga.
  if (!context.loading && !context.isAuthenticated) {
    // Muestra un mensaje de error indicando que el usuario debe iniciar sesión para acceder a la página.
    toast.error("Debes iniciar sesión para acceder a esta página");
    // Navega al usuario a la página de inicio de sesión.
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
