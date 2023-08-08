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
    await loginUser(formFields, toast, () => {
      context.setIsAuthenticated(true);
      navigate("/home");
    });
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
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row items-center w-full lg:w-2/3 max-w-4xl justify-center">
          <div className="w-full lg:w-4/5 p-5">
            <h1 className="mb-6 text-3xl lg:text-4xl font-bold text-center text-blue-500">
              Inicia Sesion
            </h1>
            <div className="flex justify-center items-center">
              <form
                className="w-full max-w-md  py-6 bg-white rounded-lg"
                onSubmit={handleSubmit}
              >
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
                  className="flex justify-center mt-5 text-blue-500 hover:text-blue-700 "
                >
                  ¿No estás registrado? Regístrate aquí
                </Link>
                <Button
                  type="submit"
                  className="w-full px-4 py-2 mt-4 text-white bg-sky-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Inicia Sesion
                </Button>
              </form>
            </div>
          </div>
          <div className="hidden lg:block w-3/5  bg-blue-600 text-gray-100 rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-2">
              Bienvenido a{" "}
              <span className="text-amber-300 "> Vetdiary APP</span>
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2 mt-5"></div>
            <p className="mb-10 mt-5 text-2xl lg:text-3xl font-bold text-gray-100">
              Administra tu veterinaria con Nosotros
            </p>
            <br></br>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
