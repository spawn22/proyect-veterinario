import { z } from "zod";

export const createAnimalSchema = z.object({
  animalName: z.string({
    required_error: "Animal Name is required",
  }),
  animalOwner: z.string({
    required_error: "Animal Owner is required",
  }),
  animalType: z.string({
    required_error: "Animal Type is required",
  }),
  animalAge: z
    .number({
      required_error: "Animal Age is required",
    })
    .max(30, {
      message: "Animal Age must be less than 30",
    }),
  animalGender: z.string({
    required_error: "Animal Gender is required",
  }),
  animalBreed: z.string({
    required_error: "Animal Breed is required",
  }),
  animalWeight: z.number({
    required_error: "Animal Weight is required",
  }),
});
