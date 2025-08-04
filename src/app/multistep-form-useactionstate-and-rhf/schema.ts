import { z } from "zod";

export const SeatSchema = z.object({
  value: z
    .string()
    .regex(/[A-E]([1-9]|1[0-5])/)
    .nonempty(),
  id: z.string().nonempty(),
});

export const SeatsSchema = z
  .array(SeatSchema)
  .min(1, "You need to buy a min of 1 seat")
  .max(4, "You are buying too many seats!!! Leave some for others");
