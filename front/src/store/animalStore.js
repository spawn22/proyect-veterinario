import { create } from "zustand";
import instance from "./interceptors/config";
import { immer } from "zustand/middleware/immer";

export const useAnimalStore = create(
  immer((set, get) => ({
    patients: [],
    patient: null,
    patientEdit: [],
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

    putAnimal: async (data) => {
      try {
        const apiResponse = await instance.put(`/patient/${data.id}`, data);
        set((state) => {
          let patientState = state.patients.filter((_) => _.id !== data.id);
          patientState.push(apiResponse.data);
          state.patients = patientState;
        });
      } catch (error) {
        set((state) => ({ errors: [...state.errors, error.res.data] }));
      } finally {
        get().getAnimals();
      }
    },
  }))
);

export const getAnimalById = (id) => {
  return (state) => {
    let patient = state.patients.filter((p) => p._id === id);
    if (patient) {
      return patient[0];
    }
    return null;
  };
};
