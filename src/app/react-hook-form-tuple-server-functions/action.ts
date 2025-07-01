"use server";

import { FieldErrors } from "react-hook-form";
import { Person } from "./schema";

type PersonWithId = Person & { id: string };

export type ReturnType = [PersonWithId, null] | [null, FieldErrors<Person>];

export const createPerson = async (person: Person): Promise<ReturnType> => {
  if (person.email.endsWith("@dfds.com")) {
    const fieldErrors = {
      email: {
        type: "validate",
        message: "not allowing dfds email",
      },
    } satisfies FieldErrors;
    return [null, fieldErrors];
  }

  const personWithId = {
    id: "1",
    ...person,
  };

  return [personWithId, null];
};
