import { create } from "zustand";
import instance from "./interceptors/config";

export const useAnimalStore = create((set, get) => ({
  patients: [],
  patient: null,

  getAnimals: async () => {
    try {
      const res = await instance.get("/patient");
      const data = res.data;
      set({ patients: data });
    } catch (error) {
      console.log(error);
    }
  },
  registerAnimal: async (data) => {
    try {
      const res = await instance.post("/patient", data);
      const patient = res.data;
      return patient;
    } catch (error) {
      set(() => ({ errors: error.response.data.error }));
    } finally {
      get().getAnimals();
    }
  },
  deleteAnimal: async (id) => {
    console.log(id);
    try {
      const res = await instance.delete(`/patient/${id}`);
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      }));
      return res.data;
    } catch (error) {
      set((state) => ({ errors: [...state.errors, error.res.data] }));
    } finally {
      get().getAnimals();
    }
  },
}));
