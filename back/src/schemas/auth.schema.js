import { z } from "zod";

export const registerSchema = z.object({
  username: z.lazy((value) =>
    value === ""
      ? z.string({ required_error: "Username is required" })
      : z.string()
  ),
  name: z.lazy((value) =>
    value === "" ? z.string({ required_error: "Name is required" }) : z.string()
  ),
  lastName: z.lazy((value) =>
    value === ""
      ? z.string({ required_error: "Lastname is required" })
      : z.string()
  ),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
}).refine((data) => {
  // Validar que no hayan campos vacíos
  return !Object.values(data).some((value) => value === "");
}, { message: "All fields are required" });


export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});
