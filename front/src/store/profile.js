import { create } from "zustand";
import instance from "./interceptors/config";

export const useProfileStore = create((set) => ({
  profile: [],
  errors: [],
  getProfileData: async () => {
    try {
      const res = await instance.get("/profile");
      const data = res.data;
      set({ profile: data });
    } catch (error) {
      console.log(error);
      set({ errors: error.res.data });
    }
  },
}));
