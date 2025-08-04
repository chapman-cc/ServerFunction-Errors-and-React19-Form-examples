import { z } from "zod";

export const TicketBookingStep = {
  reservation: 0,
  review: 1,
  complete: 2,
} as const;

const SeatSchema = z.object({
  value: z
    .string()
    .regex(/[A-E]([1-9]|1[0-5])/)
    .nonempty(),
  id: z.string().nonempty(),
});

export type Seat = z.infer<typeof SeatSchema>;
export const SeatsSchema = z
  .array(SeatSchema)
  .min(1, "You need to buy a min of 1 seat")
  .max(4, "You are buying too many seats!!! Leave some for others");

export type TicketBookingStep =
  (typeof TicketBookingStep)[keyof typeof TicketBookingStep];

export type Payload = { seats: Seat[] };
