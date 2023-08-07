import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { AuthContext } from "../../context/AuthContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";
function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  if (context.isAuthenticated) {
    navigate("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(formFields, toast);
    // La función se ejecuta solo si el inicio de sesión es exitoso
    context.setIsAuthenticated(true);
    toast.success("Usuario Logeado Exitosamente");
    toast.loading("Redireccionando...", { duration: 1000 });
    navigate("/home");
  
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    switch (name) {
      case "email":
        setErrors((prevState) => ({
          ...prevState,
          email: value ? "" : "Ingresa un Email",
        }));
        if (!value) {
          toast.error("Ingresa un Email");
        }
        break;
      case "password":
        setErrors((prevState) => ({
          ...prevState,
          password: value ? "" : "Ingresa una Contraseña",
        }));
        if (!value) {
          toast.error("Ingresa una Contraseña", { duration: 1000 });
        }
        break;
      default:
        break;
    }
    // Verificar si todos los campos están llenos
  };

  return (
    <div className="flex justify-center items-center h-screen max-h-[55rem] ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Inicia Sesion
        </h1>
        <div className="mb-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : ""
            }`}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            onChange={handleInputChange}
          />
        </div>
        <Link
          to="/register"
          className="block mt-5 text-blue-500 hover:text-blue-700 "
        >
          ¿No estás registrado? Regístrate aquí
        </Link>
        <Button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Inicia Sesion
        </Button>
      </form>
    </div>
  );
}

export default Login;
