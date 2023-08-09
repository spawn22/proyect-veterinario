import { create } from "zustand";
import instance from "./interceptors/config";

export const useProfileStore = create((set) => ({
  profile: [],
  errors: [],
  getProfileData: async (toast) => {
    try {
      const res = await instance.get("/profile");
      const data = res.data;
      set({ profile: data });
    } catch (error) {
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
}));
