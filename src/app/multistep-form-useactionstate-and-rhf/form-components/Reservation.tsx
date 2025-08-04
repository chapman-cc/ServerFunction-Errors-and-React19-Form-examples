"use client";
import { useFormStatus } from "react-dom";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Payload } from "../types";

// Mini form 1

export const Reservation = () => {
  const { register, control } = useFormContext<Payload>();
  const { fields, append } = useFieldArray({ control, name: "seats" });
  const { pending } = useFormStatus();

  const appendSeatInput = () => {
    append({ id: Date.now().toString(36), value: "" });
  };

  return (
    <div>
      <button type="button" onClick={appendSeatInput}>
        Add seat
      </button>
      {fields.map((field, idx) => (
        <div key={field.id}>
          <label htmlFor={field.id}>
            Seat {idx + 1}
            <input id={field.id} {...register(`seats.${idx}.value`)} />
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
