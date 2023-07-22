import { createContext, useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const verifyToken = useAuthStore((state) => state.verify);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.accessToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await verifyToken(cookies.accessToken);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkLogin();
  }, [verifyToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, errors, setErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
