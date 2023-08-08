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
import AnimalForm from "./components/AnimalForm";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" containerClassName="mt-10" />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/edit/:id" element={<AnimalForm />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
