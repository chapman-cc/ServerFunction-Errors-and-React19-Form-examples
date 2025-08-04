"use server";

import { FieldErrors } from "react-hook-form";
import { Person } from "./schema";

export const createPerson = async (
  person: Person
): Promise<Person | FieldErrors<Person>> => {
  if (person.email.endsWith("@dfds.com")) {
    return {
      email: { type: "pattern", message: "Cannot be DFDS" },
    } satisfies FieldErrors<Person>;
  }

  return { ...person, id: "1" };
};
