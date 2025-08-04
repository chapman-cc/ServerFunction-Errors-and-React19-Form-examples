import z from "zod";
import { SeatSchema } from "./schema";

export type Seat = z.infer<typeof SeatSchema>;

export const Step = {
  reservation: "Reservation",
  review: "Review",
  complete: "Complete",
} as const;

export const Steps = [Step.reservation, Step.review, Step.complete];

export type Step = (typeof Step)[keyof typeof Step];

export type TicketBookingStep = (typeof Step)[keyof typeof Step];

export type Payload = { seats: Seat[] };
