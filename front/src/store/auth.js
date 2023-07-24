import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  registerUser: async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        data
      );
      if (response.status === 200) {
        const user = response.data;
        console.log(user);
        set(() => ({ user }));
        return user;
      } else {
        throw new Error("Error al registrar");
      }
    } catch (error) {
      console.error(error);
    }
  },
  loginUser: async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data,
        { withCredentials: true }
        );
        if (response.status === 200) {
        const user = response.data;
        set(() => ({ user }));
        localStorage.setItem("token", user.accessToken);
        return user;
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
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
