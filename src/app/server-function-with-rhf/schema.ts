import { z } from "zod";

export const PersonSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Too short for name"),
  email: z.email(),
});

export type Person = z.infer<typeof PersonSchema>;

export function isPerson(arg: unknown): arg is Person {
  return (
    typeof arg === "object" && arg !== null && "name" in arg && "email" in arg
  );
}
