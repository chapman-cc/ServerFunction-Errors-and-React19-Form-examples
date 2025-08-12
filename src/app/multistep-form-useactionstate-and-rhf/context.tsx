"use client";

import {
  createContext,
  PropsWithChildren,
  startTransition,
  use,
  useActionState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { State, ticketBookingStepController } from "./action";
import { Payload, Step } from "./types";

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
    step: Step.reservation,
  });

  const formActionTransition = (payload: Payload) => {
    startTransition(() => formAction(payload));
  };

  return (
    <BookingTicketStateContext value={state}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formActionTransition)}>
          {children}
        </form>
      </FormProvider>
    </BookingTicketStateContext>
  );
}
