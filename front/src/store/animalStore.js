import { create } from "zustand";
import axios from "axios";

export const useAnimalStore = create((set) => ({
  patient: "null",
  registerAnimal: async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/patient",
        data,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const patient = response.data;
        console.log(patient);
        set(() => ({ patient }));
        return patient;
      } else {
        throw new Error("Error al registrar");
      }
    } catch (error) {
      set(() => ({ errors: error.response.data.error }));
    }
  },
}));
