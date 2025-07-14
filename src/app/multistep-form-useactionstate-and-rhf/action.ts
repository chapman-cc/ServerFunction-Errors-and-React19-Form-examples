"use server";

import {
  BookingTicketStep,
  Payload,
  Seat,
  SeatsSchema,
} from "./BookingTicketStep";

export type State = {
  step: (typeof BookingTicketStep)[keyof typeof BookingTicketStep];
  seats: Seat[];
  error?: Error;
};

export const TicketBookingProxy = async (
  prevState: State,
  payload: Payload
): Promise<State> => {
  try {
    switch (prevState.step) {
      case BookingTicketStep.reservation:
        return reserveSeats(payload.seats);
      case BookingTicketStep.review:
        return bookTickets(payload.seats);
      default:
        throw new Error();
    }
  } catch (error) {
    // reset user to step 1
    return {
      seats: [],
      error: error instanceof Error ? error : new Error("Something gone wrong"),
      step: BookingTicketStep.reservation,
    };
  }
};

const reserveSeats = (seats: Seat[]): State => {
  try {
    const parsedSeats = SeatsSchema.parse(seats);

    // mark seats as reserved in

    return {
      step: BookingTicketStep.review,
      seats: parsedSeats,
    };
  } catch (error) {
    const seatString = seats.map((seat) => seat.value).join(", ");
    return {
      step: BookingTicketStep.reservation,
      seats: [],
      error: new Error("Cannot book seat " + seatString),
    };
  }
};

const bookTickets = (seats: Seat[]): State => {
  // mark seats as sold
  // add loyalty points to user account
  // add movie to user history
  // call AWS SES to send email to user

  return {
    seats,
    step: BookingTicketStep.complete,
  };
};
