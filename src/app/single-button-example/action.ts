"use server";

export type State =
  | "unapproved"
  | "pending"
  | "success"
  | "failed"
  | "wrong type"
  | "size too big";

export const submitDocument = async (docId: number): Promise<State> => {
  await new Promise((res) => setTimeout(res, 1000));
  return "success";
};
