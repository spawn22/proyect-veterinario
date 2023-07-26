import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
<<<<<<< HEAD
import Calendar from "./components/Calendar/Calendar";
import { AuthProvider } from "./context/authContext";
=======
import { AuthProvider } from "./context/AuthContext";
>>>>>>> home
import "./App.css";
import Home from "./components/Home/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
