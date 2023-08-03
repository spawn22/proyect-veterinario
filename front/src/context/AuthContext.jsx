import { createContext, useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const verifyToken = useAuthStore((state) => state.verify);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
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
  }, [verifyToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        errors,
        setErrors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
