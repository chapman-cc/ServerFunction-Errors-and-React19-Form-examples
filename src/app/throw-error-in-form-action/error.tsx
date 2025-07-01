"use client";

import React from "react";

interface Props {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function error({ error, reset }: Props) {
  console.dir(error);
  return (
    <div>
      <p>This demo thrown error with error boundary</p>
      <p>
        Error name: <b>{error.name}</b>
      </p>
      <p>
        Error message: <b>{error.message}</b>
      </p>
      <p>
        Error digest: <b>{error.digest}</b>
      </p>

      <button type="button" onClick={reset}>
        Reset Prop
      </button>
    </div>
  );
}
