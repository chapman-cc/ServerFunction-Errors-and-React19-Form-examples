"use server";

import { redirect } from "next/navigation";
import { BookingTicketStep, Seat } from "./BookingTicketStep";

export type State = {
  step: (typeof BookingTicketStep)[keyof typeof BookingTicketStep];
  seats: Seat[];
  errorMessage?: string;
};

export const bookingTicketInMultipleSteps = async (
  prevState: State,
  data: FormData
): Promise<State> => {
  // prettier-ignore
  switch (prevState.step) {
    case BookingTicketStep.reservation: return reservation(data);
    case BookingTicketStep.review:      return review(data);
    case BookingTicketStep.complete:    return complete(data);
  }
};

const reservation = (data: FormData): State => {
  const seats = data.getAll("seat").map((value) => value.toString());
  for (const seat of seats) {
    if (seat.length === 0) {
      return {
        step: BookingTicketStep.reservation,
        seats: [],
        errorMessage: "No Seat choosen",
      };
    }
    if (!/[A-Z][1-9]/.test(seat)) {
      return {
        step: BookingTicketStep.reservation,
        seats: [],
        errorMessage: "Seat number out of bound",
      };
    }
  }

  return { step: BookingTicketStep.review, seats: seats };
};

const review = (data: FormData): State => {
  const seats = data.getAll("seat").map((value) => value.toString());
  return { step: BookingTicketStep.complete, seats: seats };
};

//! this part doesn't run
//! client side complete step doesn't trigger this function
const complete = (data: FormData): State => {
  const seats = data.getAll("seat").map((value) => value.toString());
  const params = new URLSearchParams(seats.map((seat) => ["seat", seat]));

  redirect("/cofirm-seat?" + params.toString());
  return {
    step: BookingTicketStep.reservation,
    seats: seats,
    errorMessage: "Something gone wrong",
  };
};
