"use client";
import { useForm } from "react-hook-form";
import { createPerson } from "./action";
import { Person } from "./schema";

const defaultValues = {
  name: "John Doe",
  email: "johndoe@dfds.com",
} satisfies Person;

export default function page() {
  const { formState, register, setError, handleSubmit } = useForm<Person>({
    defaultValues,
  });

  const submitPerson = async (person: Person) => {
    const [created, fieldErrors] = await createPerson(person);

    if (fieldErrors) {
      for (const field in fieldErrors) {
        if (field in fieldErrors) {
          const fieldKey = field as keyof Person;
          const err = fieldErrors[fieldKey];
          if (err) {
            setError(fieldKey, err);
          }
        }
      }
    } else {
      alert(
        `Person id: ${created.id}: ${created.name} (${created.email}) created`
      );
    }
  };

  return (
    <>
      <form onClick={handleSubmit(submitPerson)}>
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
