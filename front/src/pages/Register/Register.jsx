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

  if(context.isAuthenticated) {
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
    // Verificar si todos los campos están llenos
  };

  return (
    <div className="flex justify-center items-center h-screen max-h-[55rem] ">
      

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Registro
        </h1>
        <div className="mb-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
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
            placeholder="Last Name"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
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
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
        </div>
        <Link
          to="/login"
          className="block mt-4 text-blue-500 hover:text-blue-700"
        >
          ¿Ya estás registrado? Inicia sesión aquí
        </Link>

        <Button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          Registro
        </Button>
      </form>
    </div>
  );
}

export default Register;
