"use server";

import { redirect } from "next/navigation";
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

export const bookingTicketInMultipleSteps = async (
  prevState: State,
  payload: Payload
): Promise<State> => {
  try {
    const action = {
      [BookingTicketStep.reservation]: reserveSeats,
      [BookingTicketStep.review]: BookTickets,
      [BookingTicketStep.complete]: undefined,
    }[prevState.step];

    if (!action) {
      throw new Error();
    }

    return action(payload.seats);
  } catch (error) {
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

const BookTickets = (seats: Seat[]): State => {
  // mark seats as sold
  // add loyalty points to user account
  // add movie to user history
  // call AWS SES to send email to user

  const params = new URLSearchParams(seats.map((seat) => ["seat", seat.value]));
  redirect(
    "/multistep-form-useactionstate-and-rhf/cofirm-seat?" + params.toString()
  );
};
