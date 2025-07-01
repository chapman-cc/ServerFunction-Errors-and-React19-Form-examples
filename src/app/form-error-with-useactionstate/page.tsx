"use client";
import React, { useActionState } from "react";
import { handleSubmitWithState, State } from "./action";

export default function page() {
  const [hasError, formAction, isPending] = useActionState<State, FormData>(
    handleSubmitWithState,
    null
  );
  return (
    <>
      {hasError instanceof Error && <p>Error state: {hasError.message}</p>}
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
