"use client";
import { PropsWithChildren } from "react";
import { useBookingTicketStateContext } from "../context";
import { Step } from "../types";

export function MiniForm({
  children,
  matchingStep,
}: PropsWithChildren<{ matchingStep: Step }>) {
  const { step } = useBookingTicketStateContext();
  if (step !== matchingStep) return null;
  return children;
}
