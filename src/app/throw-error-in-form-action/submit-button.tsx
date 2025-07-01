"use client";

import { useFormStatus } from "react-dom";

export function Submit() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <button type="button" disabled>
        Submitting
      </button>
    );
  }
  return <button type="submit">Submit</button>;
}
