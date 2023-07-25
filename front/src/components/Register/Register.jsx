import { Form, Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const registerUser = useAuthStore((state) => state.registerUser);
  const StateErrors = useAuthStore((state) => state.errors);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, lastName, username, email, password };
    await registerUser(data, navigate);
  };

  useEffect(() => {
    if (context.isAuthenticated) {
      navigate("/home");
    }
    navigate("/");
  }, [context.isAuthenticated, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        setErrors((prevState) => ({
          ...prevState,
          name: value ? "" : "Name is required",
        }));
        break;
      case "lastName":
        setLastName(value);
        setErrors((prevState) => ({
          ...prevState,
          lastName: value ? "" : "Last name is required",
        }));
        break;
      case "username":
        setUserName(value);
        setErrors((prevState) => ({
          ...prevState,
          username: value ? "" : "Username is required",
        }));
        break;
      case "email":
        setEmail(value);
        setErrors((prevState) => ({
          ...prevState,
          email: value ? "" : "Email is required",
        }));
        break;
      case "password":
        setPassword(value);
        setErrors((prevState) => ({
          ...prevState,
          password: value ? "" : "Password is required",
        }));
        break;
      default:
        break;
    }
    // Verificar si todos los campos están llenos
    setFormFilled(
      name !== "" &&
        lastName !== "" &&
        username !== "" &&
        email !== "" &&
        password !== ""
    );
  };
  return (
    <div className="flex justify-center items-center h-screen max-h-[55rem] ">
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Registro
        </h1>
        <div className="mb-4">
          {StateErrors.length > 0 && (
            <p className="mt-2 text-lg font-bold text-red-500  mb-2 h-6">
              {StateErrors}
            </p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : ""
            }`}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.name}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? "border-red-500" : ""
            }`}
            onChange={handleInputChange}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.lastName}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.username ? "border-red-500" : ""
            }`}
            onChange={handleInputChange}
          />
          {errors.username && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.username}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.email}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.password}
            </p>
          )}
        </div>
        <Link
          to="/login"
          className="block mt-4 text-blue-500 hover:text-blue-700"
        >
          ¿Ya estás registrado? Inicia sesión aquí
        </Link>
        {/* <Link
          to="/login"
          className="block mt-4 text-blue-500 hover:text-blue-700"
        >
        </Link> */}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!formFilled}
        >
          Registro
        </button>
      </Form>
    </div>
  );
}

export default Register;
