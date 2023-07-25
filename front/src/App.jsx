import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { AuthProvider } from "./context/AuthContext";
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
