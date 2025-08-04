import z from "zod";
import { SeatSchema } from "./schema";

export type Seat = z.infer<typeof SeatSchema>;

export const TicketBookingStep = {
  reservation: "Reservation",
  review: "Review",
  complete: "Complete",
} as const;

export const TicketBookingSteps = [
  TicketBookingStep.reservation,
  TicketBookingStep.review,
  TicketBookingStep.complete,
];

export type TicketBookingStep =
  (typeof TicketBookingStep)[keyof typeof TicketBookingStep];

export type Payload = { seats: Seat[] };
