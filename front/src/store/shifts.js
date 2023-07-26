import { create } from "zustand";
import axios from "axios";

export const useShiftsStore = create((set) => ({
  shifts: [],
  getShifts: async () => {
    const res = await axios.get("http://localhost:3000/api/shift", {
      withCredentials: true,
    });
    const data = res.data;
    set({ shifts: await data });
  },
  postShifts: async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/shift", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  putShifts: async (id, data) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/shift/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  deleteShifts: async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/shift/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
}));
