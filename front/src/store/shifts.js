import { create } from "zustand";
import instance from "./interceptors/config";

export const useShiftsStore = create((set, get) => ({
  shifts: [],
  errors: [],
  getShifts: async () => {
    try {
      const res = await instance.get("/shift");
      const data = res.data;
      set({ shifts: data });
    } catch (error) {
      console.log(error);
      set({ errors: [...get().errors, error.res.data] });
    }
  },
  postShifts: async (data) => {
    try {
      const res = await instance.post("/shift", data);
      set((state) => ({ shifts: [...state.shifts, res.data] }));
      return res.data;
    } catch (error) {
      set((state) => ({ errors: [...state.errors, error.res.data] }));
    } finally {
      get().getShifts();
    }
  },
  putShifts: async (id, data) => {
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
      set((state) => ({ errors: [...state.errors, error.res.data] }));
    } finally {
      get().getShifts();
    }
  },
  deleteShifts: async (id) => {
    try {
      const res = await instance.delete(`/shift/${id}`);
      set((state) => ({
        shifts: state.shifts.filter((shift) => shift.id !== id),
      }));
      return res.data;
    } catch (error) {
      set((state) => ({ errors: [...state.errors, error.res.data] }));
    } finally {
      get().getShifts();
    }
  },
}));
