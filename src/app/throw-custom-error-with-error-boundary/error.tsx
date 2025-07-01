"use client";

import { CustomFormError } from "@/actions/CustomFormError";
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

      <br />
      <h4>Custom error details:</h4>
      {error instanceof CustomFormError ? (
        <div>
          <p>{error.field}</p>
        </div>
      ) : (
        <p>cannot read custom value from custom error</p>
      )}
    </div>
  );
}
