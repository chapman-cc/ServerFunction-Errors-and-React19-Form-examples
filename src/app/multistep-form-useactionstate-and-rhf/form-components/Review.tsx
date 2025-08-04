"use client";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";
import { Payload } from "../types";

// Mini form 2

export const Review = () => {
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
