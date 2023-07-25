import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  errors: [],
  messageError: "",
  registerUser: async (data, navigate) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        data
      );
      if (response.status === 200) {
        const user = response.data;
        console.log(user);
        set(() => ({ user }));
        navigate("/login");
        return user;
      } else {
        throw new Error("Error al registrar");
      }
    } catch (error) {
      set(() => ({ errors: error.response.data.error }));
    }
  },
  loginUser: async (data, navigate) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const user = response.data;
        set(() => ({ user }));
        navigate("/home");
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
  verify: async () =>
    axios.get("http://localhost:3000/api/verify", { withCredentials: true }),

  logout: () =>
    set(
      () => (
        { user: null },
        Cookies.remove("accessToken"),
        localStorage.removeItem("token")
      )
    ),
}));
