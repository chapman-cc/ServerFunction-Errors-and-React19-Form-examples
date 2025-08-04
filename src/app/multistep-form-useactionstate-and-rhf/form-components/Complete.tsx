"use client";
import { useBookingTicketStateContext } from "../context";

// Mini form 3

export const Complete = () => {
  const { seats } = useBookingTicketStateContext();
  const seatString = seats.map((seat) => seat.value).join(", ");
  return <div>You have completed the booking for seat {seatString}</div>;
};
