"use client";
import { useBookingTicketStateContext } from "../context";

export function BookingTicketFormError() {
  const { error } = useBookingTicketStateContext();
  if (!error) return null;
  return <h3 style={{ color: "red" }}>{error.message}</h3>;
}
