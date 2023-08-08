import { createContext, useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const verifyToken = useAuthStore((state) => state.verify);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/"
    ) {
      setLoading(false);
      return;
    }
    const checkLogin = async () => {
      const cookies = Cookies.get();
      localStorage.setItem("accessToken", cookies.accessToken);
      const token = localStorage.getItem("accessToken");
      if (!token || token === undefined) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      try {
        await verifyToken(cookies.accessToken);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        if (!cookies.accessToken) {
          await refreshToken();
          setIsAuthenticated(true);
          setLoading(false);
        }
        if (!cookies.refreshToken && !cookies.accessToken) {
          setIsAuthenticated(false);
          setLoading(false);
        }
      }
    };
    checkLogin();
  }, [verifyToken, refreshToken, location]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        errors,
        setErrors,
        loading,
        isButtonLoading,
        setIsButtonLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
