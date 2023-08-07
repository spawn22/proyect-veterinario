import Carousel from "../../components/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Button from "../../components/Button";

function Landing() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context.isAuthenticated) {
    navigate("/home");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <Carousel />
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center top-[25rem]">
          <h1 className="text-5xl font-extrabold  mb-4 text-black text-center">
            ¡Bienvenido a Tu Agenda!
          </h1>
          <Link to="/login">
            <Button className="px-6 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded-md">
              Iniciar Sesion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
