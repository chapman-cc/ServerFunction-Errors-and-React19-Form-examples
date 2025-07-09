"use client";
import { CSSProperties, useActionState } from "react";
import { handleSubmitWithState, State } from "./action";

type ButtonProps = {
  color?: CSSProperties["color"];
  textContent: string;
};

function statePropsMatcher(state: State): ButtonProps {
  return {
    unapproved: { textContent: "Approve" },
    pending: {
      color: "grey",
      textContent: "Approving...",
    },
    success: {
      color: "green",
      textContent: "Approved",
    },
    failed: {
      color: "red",
      textContent: "Not Approved, try again?",
    },
    "wrong type": {
      color: "red",
      textContent: "File type incorrect, try again?",
    },
    "size too big": {
      color: "red",
      textContent: "File too big, Remove it",
    },
  }[state];
}

export function ApproveHazardousDocButton() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    handleSubmitWithState,
    "unapproved"
  );

  const { color, textContent } = isPending
    ? statePropsMatcher("pending")
    : statePropsMatcher(state);

  return (
    <>
      <form action={formAction}>
        <button
          type="submit"
          disabled={isPending || state === "success"}
          style={{ color: color }}
        >
          {textContent}
        </button>
      </form>
    </>
  );
}
