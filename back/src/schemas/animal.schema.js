import { z } from "zod";

export const createAnimalSchema = z.object({
  name: z.string({
    required_error: "Animal Name is required",
  }),
  owner: z.string({
    required_error: "Animal Owner is required",
  }),
  type: z.string({
    required_error: "Animal Type is required",
  }),
  age: z
    .number({
      required_error: "Animal Age is required",
    })
    .max(30, {
      message: "Animal Age must be less than 30",
    }),
  gender: z.string({
    required_error: "Animal Gender is required",
  }),
  breed: z.string({
    required_error: "Animal Breed is required",
  }),
  weight: z.number({
    required_error: "Animal Weight is required",
  }),
});
