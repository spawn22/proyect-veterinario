import { Form, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = useAuthStore((state) => state.loginUser);
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    const user = loginUser(data);
    return user;
  };
  
  useEffect(() => {
    if (context.isAuthenticated) {
      navigate('/home');
    }
  }, [context.isAuthenticated, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        setErrors((prevState) => ({
          ...prevState,
          email: value ? '' : 'Email is required',
        }));
        break;
      case 'password':
        setPassword(value);
        setErrors((prevState) => ({
          ...prevState,
          password: value ? '' : 'Password is required',
        }));
        break;
      default:
        break;
    }
    // Verificar si todos los campos están llenos
    setFormFilled(email !== '' && password !== '');
  };

  return (
    <div className="flex justify-center items-center h-screen max-h-[55rem] ">
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Inicia Sesion
        </h1>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : ''
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
              errors.password ? 'border-red-500' : ''
            }`}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.password}
            </p>
          )}
        </div>
        <Link to="/" className="block mt-4 text-blue-500 hover:text-blue-700">
          ¿No estás registrado? Regístrate aquí
        </Link>
        <Link
          to="/home"
          className="block mt-4 text-blue-500 hover:text-blue-700"
        >
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!formFilled}
          >
            Inicia Sesion
          </button>
        </Link>
      </Form>
    </div>
  );
}

export default Login;
