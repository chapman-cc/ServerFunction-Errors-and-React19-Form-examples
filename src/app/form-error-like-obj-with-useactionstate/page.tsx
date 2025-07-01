"use client";
import React, { useActionState } from "react";
import { handleSubmitWithState, isValidationFailed, State } from "./action";

export default function page() {
  const [hasValidationFailed, formAction, isPending] = useActionState<
    State,
    FormData
  >(handleSubmitWithState, null);
  return (
    <>
      {isValidationFailed(hasValidationFailed) && (
        <p>
          Error state: {hasValidationFailed.reason} in field{" "}
          {hasValidationFailed.field}
        </p>
      )}
      <form action={formAction}>
        <label htmlFor="user-name">User Name</label>
        <input type="text" name="user-name" defaultValue="John Doe" />
        {isPending ? (
          <button type="submit" disabled>
            Submitting
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </>
  );
}
