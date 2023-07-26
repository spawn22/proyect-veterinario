import { create } from "zustand";
import instance from "./interceptors/config";

export const useAuthStore = create((set) => ({
  user: null,
  errors: [],
  messageError: "",
  registerUser: async (data, navigate, toast) => {
    try {
      const response = await instance.post("/register", data);
      if (response.status === 200) {
        const user = response.data ? response.data : null;
        set(() => ({ user }));
        toast.success("Usuario Registrado", { duration: 3000 });
        setInterval(() => {
          navigate("/login");
        }, 3000);
        return user;
      } else {
        throw new Error("Registration failed: Invalid input data");
      }
    } catch (error) {
      set(() => ({ errors: error.response.data.error }));
    }
  },
  loginUser: async (data, navigate, toast) => {
    try {
<<<<<<< HEAD
      const response = await instance.post("/login", data);
      if (response.status === 200) {
=======
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data,
        { withCredentials: true }
        );
        if (response.status === 200) {
>>>>>>> home
        const user = response.data;
        set(() => ({ user }));
        toast.success("Usuario Logeado Exitosamente", { duration: 3000 });
        setInterval(() => {
          navigate("/home");
        }, 3000);
        return user;
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      set(() => ({ errors: error.response.data.error }));
      set(() => ({ messageError: error.response.data.message }));
    }
  },
  verify: async () => instance.get("/verify"),

  logout: async () => {
    await instance.post("/logout"), set(() => ({ user: null }));
  },
}));
