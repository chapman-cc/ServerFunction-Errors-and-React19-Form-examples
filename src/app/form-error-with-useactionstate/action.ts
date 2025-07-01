"use server";

export type State = Error | null;

export const handleSubmitWithState = async (
  prevState: State,
  data: FormData
) => {
  const userName = data.get("user-name");
  // must return a state (in this case an Error) or it gets redirect to ./error.tsx
  return new Error("Got user name " + userName);
};
