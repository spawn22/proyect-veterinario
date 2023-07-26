import z from "zod";

export const createShiftSchema = z.object({
  description: z.string({
    required_error: "Description is required",
  }),
  date: z.string({
    required_error: "Date is required",
  }),
  start_time: z.string({
    required_error: "Start time is required",
  }),
});
