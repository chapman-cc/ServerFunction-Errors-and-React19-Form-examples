"use server";

export type ValidationFailed = {
  field: string;
  reason: string;
};

export function isValidationFailed(arg: unknown): arg is ValidationFailed {
  return (
    typeof arg === "object" && arg !== null && "field" in arg && "reason" in arg
  );
}

export type State = ValidationFailed | null;

export const handleSubmitWithState = async (
  prevState: State,
  data: FormData
): Promise<State> => {
  const userName = data.get("user-name");
  // must return a state (in this case an Error) or it gets redirect to ./error.tsx
  return {
    field: "user-name",
    reason: "John Doe is not allowed",
  };
};
