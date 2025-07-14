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
import { bookingTicketInMultipleSteps, State } from "./action";
import { BookingTicketStep, Payload } from "./BookingTicketStep";

const orderedSteps = Object.entries(BookingTicketStep).sort(
  ([, a], [, b]) => a - b
);

export function MultiStepFormWithRHF() {
  const methods = useForm<Payload>();

  const [state, formAction] = useActionState<State, Payload>(
    bookingTicketInMultipleSteps,
    { seats: [], step: 0 }
  );

  const formActionTransition = (payload: Payload) => {
    startTransition(() => formAction(payload));
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formActionTransition)}>
          <Stepper activeStep={state.step}>
            {orderedSteps.map(([label, step]) => (
              <Step key={step}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <h3 style={{ color: "red" }}>{state.error?.message}</h3>
          {
            {
              [BookingTicketStep.reservation]: <Reservation />,
              [BookingTicketStep.review]: <Review />,
              [BookingTicketStep.complete]: <Complete />,
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
      <button>Reserve Seats</button>
    </div>
  );
};

// Mini form 2

const Review = () => {
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
      <button type="submit">Confirm</button>
    </div>
  );
};

// Mini form 3

const Complete = () => <div>You have completed the booking</div>;
