export const BookingTicketStep = {
  reservation: 0,
  review: 1,
  complete: 2,
} as const;

export type BookingTicketStep =
  (typeof BookingTicketStep)[keyof typeof BookingTicketStep];

export type Seat = string;
