"use server";

export type State =
  | "unapproved"
  | "pending"
  | "success"
  | "failed"
  | "wrong type"
  | "size too big";

export const handleSubmitWithState = async (
  prevState: State,
  data: FormData
): Promise<State> => {
  await new Promise((res) => setTimeout(res, 1000));
  return "success";
};
