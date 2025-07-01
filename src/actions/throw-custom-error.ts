"use server";

import { CustomFormError } from "./CustomFormError";

export default async function throwCustomError() {
  const err = new CustomFormError("user-name", "User name is used already");
  throw err;
}
