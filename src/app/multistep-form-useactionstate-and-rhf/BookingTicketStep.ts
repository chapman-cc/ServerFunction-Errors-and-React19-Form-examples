import { z } from "zod";

export const BookingTicketStep = {
  reservation: 0,
  review: 1,
  complete: 2,
} as const;

const SeatSchema = z.object({
  value: z
    .string()
    .regex(/[A-E](1-9)|(1[0-5])/)
    .nonempty(),
  id: z.string().nonempty(),
});

export type Seat = z.infer<typeof SeatSchema>;
export const SeatsSchema = z.array(SeatSchema);

export type BookingTicketStep =
  (typeof BookingTicketStep)[keyof typeof BookingTicketStep];

export type Payload = { seats: Seat[] };
