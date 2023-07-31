import { create } from "zustand";
import instance from "./interceptors/config";

export const useAuthStore = create((set) => ({
  user: null,
  registerUser: async (data, navigate, toast) => {
    try {
      const response = await instance.post("/register", data);
      if (response.status === 200) {
        const user = response.data ? response.data : null;
        console.log(user);
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
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message, { duration: 3000 });
      }
      if (error.response.data.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err, { duration: 2000 });
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
        console.log(user);
        set(() => ({ user }));
        toast.success("Usuario Logeado Exitosamente", { duration: 3000 });
        onSuccess(); // Llamamos a onSuccess si el inicio de sesión es exitoso
        return user;
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message, { duration: 3000 });
      }
      if (error.response.data.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err, { duration: 2000 });
        });
      }
    }
  },
  verify: async () => instance.get("/verify"),

  logout: async () => {
    await instance.post("/logout"), set(() => ({ user: null }));
  },
}));
