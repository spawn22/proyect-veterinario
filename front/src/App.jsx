import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Calendar from "./pages/Calendar/Calendar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Error404 from "./pages/Error404/Error404";
import AnimalEdit from "./pages/AnimalEdit/AnimalEdit";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/edit/:id" element={<AnimalEdit />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/error404" element={<Error404></Error404>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
