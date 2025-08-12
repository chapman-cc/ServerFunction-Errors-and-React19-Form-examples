"use client";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { startTransition, useActionState, useCallback } from "react";
import { bookingTicketInMultipleSteps, State } from "./action";
import { BookingTicketStep, Seat } from "./BookingTicketStep";

const orderedSteps = Object.entries(BookingTicketStep).sort(
  ([, a], [, b]) => a - b
);

export function MultiStepForm() {
  const [state, formAction] = useActionState<State, FormData>(
    bookingTicketInMultipleSteps,
    { seats: [], step: 0 }
  );
  const { step, seats } = state;

  const startFormActionTransition = useCallback(
    (data: FormData) => startTransition(() => formAction(data)),
    [formAction]
  );

  return (
    <>
      <form action={startFormActionTransition}>
        <Stepper activeStep={state.step}>
          {orderedSteps.map(([label, step]) => (
            <Step key={step}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <h3 style={{ color: "red" }}>{state.errorMessage}</h3>
        {
          {
            [BookingTicketStep.reservation]: <Reservation />,
            [BookingTicketStep.review]: <Review seats={seats} />,
            [BookingTicketStep.complete]: <Complete />,
          }[step]
        }
      </form>
    </>
  );
}

// Mini form 1

const Reservation = () => {
  return (
    <div>
      <label>
        Seat 1
        <input type="text" name="seat" />
      </label>
      <br />
      <label>
        Seat 2
        <input type="text" name="seat" />
      </label>
      <br />
      <button>Reserve Seats</button>
    </div>
  );
};

// Mini form 2

const Review = ({ seats }: { seats: Seat[] }) => {
  return (
    <div>
      <div>You have choosen seats: {seats.join(", ")}</div>
      {seats.map((seat, i) => (
        <input name="seat" key={i} value={seat} disabled />
      ))}
      <button type="submit">Confirm</button>
    </div>
  );
};

// Mini form 3

const Complete = () => <div>You have completed the booking</div>;
