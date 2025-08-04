"use client";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import {
  createContext,
  PropsWithChildren,
  startTransition,
  use,
  useActionState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { State, ticketBookingStepController } from "./action";
import { Payload, TicketBookingStep } from "./BookingTicketStep";

const BookingTicketStateContext = createContext<State | null>(null);

export function useBookingTicketStateContext() {
  const state = use(BookingTicketStateContext);
  if (!state) {
    throw new Error("ActionStateContext not found");
  }
  return state;
}

export function BookingTicketProviders({ children }: PropsWithChildren) {
  const methods = useForm<Payload>();

  const [state, formAction] = useActionState(ticketBookingStepController, {
    seats: [],
    step: TicketBookingStep.reservation,
  });

  const formActionTransition = (payload: Payload) => {
    startTransition(() => formAction(payload));
  };

  const handleSubmit = methods.handleSubmit(formActionTransition);

  return (
    <>
      <BookingTicketStateContext.Provider value={state}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>{children}</form>
        </FormProvider>
      </BookingTicketStateContext.Provider>
    </>
  );
}

export function BookingTicketStepStepper() {
  const { step } = useBookingTicketStateContext();

  return (
    <Stepper activeStep={step}>
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
  );
}

export function BookingTicketFormError() {
  const { error } = useBookingTicketStateContext();
  if (!error) return null;
  return <h3 style={{ color: "red" }}>{error.message}</h3>;
}

export function MiniForm({
  children,
  matchingStep,
}: PropsWithChildren<{ matchingStep: TicketBookingStep }>) {
  const { step } = useBookingTicketStateContext();
  if (step !== matchingStep) return null;
  return children;
}
