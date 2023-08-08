import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { AuthContext } from "../../context/AuthContext";
import { useState, useContext } from "react";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const registerUser = useAuthStore((state) => state.registerUser);

  const [formFields, setFormFields] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  if (context.isAuthenticated) {
    navigate("/home");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await registerUser(formFields, toast);
    navigate("/login");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    switch (name) {
      case "name":
        setErrors((prevState) => ({
          ...prevState,
          name: value ? "" : "Ingresa un Nombre",
        }));
        if (!value) {
          toast.error("Ingresa un Nombre");
        }
        break;
      case "lastName":
        setErrors((prevState) => ({
          ...prevState,
          lastName: value ? "" : "Ingresa un Apellido",
        }));
        if (!value) {
          toast.error("Ingresa un Apellido");
        }
        break;
      case "username":
        setErrors((prevState) => ({
          ...prevState,
          username: value ? "" : "Ingresa un Usuario",
        }));
        if (!value) {
          toast.error("Ingresa un Usuario");
        }
        break;
      case "email":
        setErrors((prevState) => ({
          ...prevState,
          email: value ? "" : "Ingresa un Email",
        }));
        if (!value) {
          toast.error("Ingresa un Email");
        }
        break;
      case "gender":
        setErrors((prevState) => ({
          ...prevState,
          gender: value ? "" : "Selecciona un Género",
        }));
        if (!value) {
          toast.error("Selecciona un Género");
        }
        break;
      case "password":
        setErrors((prevState) => ({
          ...prevState,
          password: value ? "" : "Ingresa una Contraseña",
        }));
        if (!value) {
          toast.error("Ingresa una Contraseña");
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
            <h1 className="mb-6 text-4xl font-bold text-center text-blue-500">
              Registro
            </h1>
            <div className="flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md  py-6  rounded-lg"
              >
                <div className="mb-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <select
                    name="gender"
                    value={formFields.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un Género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <div className="mb-4">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
                <Link
                  to="/login"
                  className="flex justify-center mt-4 text-blue-500 hover:text-blue-700"
                >
                  ¿Ya estás registrado? Inicia sesión aquí
                </Link>

                <Button
                  type="submit"
                  className="w-full px-4 py-2 mt-4 text-white bg-sky-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                >
                  Registro
                </Button>
              </form>
            </div>
          </div>
          <div className="hidden lg:block w-3/5 bg-blue-600 text-gray-100 rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-2">
              Registrate en{" "}
              <span className="text-amber-300"> Vetdiary APP</span>
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2 mt-5"></div>
            <p className="mb-10 mt-5 text-2xl lg:text-3xl font-bold text-gray-100">
              ¡Empieza ya a administrar tu veterinaria!
            </p>
            <br></br>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
