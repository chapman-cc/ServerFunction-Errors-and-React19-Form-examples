"use client";
import { useActionState, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { createPerson } from "./action";
import { zodResolver } from "@hookform/resolvers/zod";
import { isPerson, Person, PersonSchema } from "./schema";

const defaultValues = {
  name: "John Doe",
  email: "johndoe@dfds.com",
} satisfies Person;

type ActionState = Person | FieldErrors<Person> | null;

export default function page() {
  const { formState, register, setError, handleSubmit } = useForm<Person>({
    defaultValues,
    resolver: zodResolver(PersonSchema),
  });

  const [state, action, isPending] = useActionState<ActionState, Person>(
    (_, person) => createPerson(person),
    null
  );
  useEffect(() => {
    if (!isPerson(state)) {
      if (state?.root) setError("root", { message: state.root.message });
      if (state?.name) setError("name", { message: state.name.message });
      if (state?.email) setError("email", { message: state.email.message });
    }
  }, [state]);

  return (
    <>
      <form onClick={handleSubmit(action)}>
        <div>
          <label htmlFor="name">User Name</label>
          <input type="text" {...register("name")} />
          {formState.errors.name && (
            <span>{formState.errors.name.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="email">User Email</label>
          <input type="email" {...register("email")} required />
          {formState.errors.email && <p>{formState.errors.email.message}</p>}
        </div>

        {formState.isSubmitting ? (
          <button type="submit" disabled>
            Submitting
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </>
  );
}
