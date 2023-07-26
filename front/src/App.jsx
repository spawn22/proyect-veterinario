import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Calendar from "./components/Calendar/Calendar";
import { AuthProvider } from "./context/authContext";
import "./App.css";

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
    element: <h1>Home</h1>,
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
