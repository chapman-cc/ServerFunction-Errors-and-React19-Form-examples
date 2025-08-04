"use client";
import { useFormStatus } from "react-dom";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Payload } from "../BookingTicketStep";

// Mini form 1

export const Reservation = () => {
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
