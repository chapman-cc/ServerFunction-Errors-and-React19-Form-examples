"use server";

import {
  TicketBookingStep as Step,
  Payload,
  Seat,
  SeatsSchema,
} from "./BookingTicketStep";
import ServerFunction from "./ServerFunction";

export type State = {
  step: Step;
  error?: Error;
  seats: Seat[];
};

type Action = ServerFunction.ActionState<State, Payload>;

export const ticketBookingStepController: Action = async (
  prevState: State,
  payload: Payload
) => {
  try {
    // prettier-ignore
    switch (prevState.step) {
      case Step.reservation:  return reserveSeats(payload.seats);
      case Step.review:       return bookTickets(payload.seats);
      default:                throw new Error();
    }
  } catch (error) {
    // reset user to step 1
    return {
      seats: [],
      error: error instanceof Error ? error : new Error("Something gone wrong"),
      step: Step.reservation,
    };
  }
};

const reserveSeats = (seats: Seat[]): State => {
  try {
    const parsedSeats = SeatsSchema.parse(seats);

    // mark seats as reserved in

    return {
      step: Step.review,
      seats: parsedSeats,
    };
  } catch (error) {
    console.log(error);
    const seatString = seats
      .filter(Boolean)
      .map((seat) => seat.value)
      .join(", ");
    return {
      step: Step.reservation,
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
    step: Step.complete,
  };
};
