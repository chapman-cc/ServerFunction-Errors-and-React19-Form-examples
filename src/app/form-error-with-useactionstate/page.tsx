"use client";
import React, { useActionState } from "react";
import { handleSubmitWithState, State } from "./action";

export default function page() {
  const [hasError, formAction, isPending] = useActionState(
    handleSubmitWithState,
    null
  );
  return (
    <>
      {hasError?.message && <p>Error state: {hasError.message}</p>}
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
