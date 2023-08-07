import { create } from "zustand";
import instance from "./interceptors/config";
import Cookies from "js-cookie";
export const useAuthStore = create((set) => ({
  user: null,
  registerUser: async (data, toast) => {
    try {
      const response = await instance.post("/register", data);
      if (response.status === 200) {
        const user = response.data ? response.data : null;
        set(() => ({ user }));
        toast.success("Usuario Registrado");
        return user;
      } else {
        throw new Error("Registration failed: Invalid input data");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      if (error.response.data.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err);
        });
      }
    }
  },
  loginUser: async (data, toast, onSuccess) => {
    // Agregamos onSuccess como argumento para llamar a la función si el inicio de sesión es exitoso
    try {
      const response = await instance.post("/login", data);
      if (response.status === 200) {
        const user = response.data;
        set(() => ({ user }));
        toast.success("Usuario Logeado Exitosamente");
        toast.loading("Redireccionando...", { duration: 1000 });
        onSuccess(); // Llamamos a onSuccess si el inicio de sesión es exitoso
        return user;
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      if (error.response.data.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err);
        });
      }
    }
  },
  verify: async () => instance.get("/verify"),

  logout: async () => {
    await instance.post("/logout");
    Cookies.remove("accessToken"); // Borramos la cookie que contiene el token
    set(() => ({ user: null }));
  },
  refreshToken: async () => {
    try {
      const res = await instance.post("/refresh");
      if (res.status === 200) {
        window.location.reload();
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
