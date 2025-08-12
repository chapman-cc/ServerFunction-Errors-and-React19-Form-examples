"use client";

import { Step, Stepper, StepLabel } from "@mui/material";
import { useBookingTicketStateContext } from "../context";
import { Steps, Step as STEP } from "../types";

export function BookingTicketStepStepper() {
  const { step } = useBookingTicketStateContext();

  return (
    <Stepper activeStep={Steps.indexOf(step)}>
      <Step>
        <StepLabel>{STEP.reservation}</StepLabel>
      </Step>
      <Step>
        <StepLabel>{STEP.review}</StepLabel>
      </Step>
      <Step>
        <StepLabel>{STEP.complete}</StepLabel>
      </Step>
    </Stepper>
  );
}
