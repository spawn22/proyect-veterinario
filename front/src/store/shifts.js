import { create } from "zustand";
import instance from "./interceptors/config";

export const useShiftsStore = create((set, get) => ({
  shifts: [],
  errors: [],
  getShifts: async (toast) => {
    try {
      const res = await instance.get("/shift");
      const data = res.data;
      set({ shifts: data });
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
  postShifts: async (data, toast) => {
    try {
      const res = await instance.post("/shift", data);
      set((state) => ({ shifts: [...state.shifts, res.data] }));
      return res.data;
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      if (error.response.data.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err);
        });
      }
    } finally {
      get().getShifts();
    }
  },
  putShifts: async (id, data, toast) => {
    try {
      const res = await instance.put(`/shift/${id}`, data);
      set((state) => ({
        shifts: state.shifts.map((shift) => {
          if (shift.id === id) {
            return res.data;
          }
          return shift;
        }),
      }));
      return res.data;
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      if (error.response.data.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err);
        });
      }
    } finally {
      get().getShifts();
    }
  },
  deleteShifts: async (id, toast) => {
    try {
      const res = await instance.delete(`/shift/${id}`);
      set((state) => ({
        shifts: state.shifts.filter((shift) => shift.id !== id),
      }));
      return res.data;
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      if (error.response.data.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err);
        });
      }
    } finally {
      get().getShifts();
    }
  },
}));
