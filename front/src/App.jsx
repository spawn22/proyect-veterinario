<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Calendar from "./pages/Calendar/Calendar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Calendar from "./components/Calendar/Calendar";
import { AuthProvider } from "./context/AuthContext";
>>>>>>> c719d842fe58e357c531be5904c4727060a0ab1d
import "./App.css";
import Home from "./components/Home/Home";

<<<<<<< HEAD
=======
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

>>>>>>> c719d842fe58e357c531be5904c4727060a0ab1d
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Toaster />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<h1>Home</h1>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
