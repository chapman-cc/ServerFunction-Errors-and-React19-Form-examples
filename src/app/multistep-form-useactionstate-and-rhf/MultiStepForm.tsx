"use client";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { startTransition, useActionState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ticketBookingStepController } from "./action";
import { TicketBookingStep, Payload, Seat } from "./BookingTicketStep";
import { useFormStatus } from "react-dom";

export function MultiStepFormWithRHF() {
  const methods = useForm<Payload>();

  const [state, formAction] = useActionState(ticketBookingStepController, {
    seats: [],
    step: TicketBookingStep.reservation,
  });

  const formActionTransition = (payload: Payload) => {
    startTransition(() => formAction(payload));
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formActionTransition)}>
          <Stepper activeStep={state.step}>
            <Step>
              <StepLabel>{TicketBookingStep.reservation}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{TicketBookingStep.review}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{TicketBookingStep.complete}</StepLabel>
            </Step>
          </Stepper>
          {state.error && (
            <h3 style={{ color: "red" }}>{state.error.message}</h3>
          )}
          {
            {
              [TicketBookingStep.reservation]: <Reservation />,
              [TicketBookingStep.review]: <Review />,
              [TicketBookingStep.complete]: <Complete seats={state.seats} />,
            }[state.step]
          }
        </form>
      </FormProvider>
    </>
  );
}

// Mini form 1

const Reservation = () => {
  const { register, control } = useFormContext<Payload>();
  const { fields, append } = useFieldArray({ control, name: "seats" });
  const { pending } = useFormStatus();

  return (
    <div>
      <button type="button" onClick={() => append({ id: "", value: "" })}>
        Add seat
      </button>
      {fields.map((field, idx) => (
        <div key={field.id}>
          <label htmlFor={field.id}>
            Seat {idx + 1}
            <input id={field.id} {...register(`seats.${idx}.value` as const)} />
          </label>
          <br />
        </div>
      ))}

      <br />

      <br />
      <button disabled={pending}>Reserve Seats</button>
    </div>
  );
};

// Mini form 2

const Review = () => {
  const { pending } = useFormStatus();
  const { getValues } = useFormContext<Payload>();
  const seats = getValues("seats");

  return (
    <div>
      <div>
        You have choosen seats: {seats.map((seat) => seat.value).join(", ")}
      </div>
      {seats.map((seat) => (
        <input name="seat" key={seat.id} value={seat.value} disabled />
      ))}
      <button type="submit" disabled={pending}>
        Confirm
      </button>
    </div>
  );
};

// Mini form 3

const Complete = ({ seats }: { seats: Seat[] }) => {
  const seatString = seats.map((seat) => seat.value).join(", ");
  return <div>You have completed the booking for seat {seatString}</div>;
};
