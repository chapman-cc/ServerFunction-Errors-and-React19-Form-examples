import { z } from "zod";

export const PersonSchema = z.object({
  name: z.string().min(3, "Too short for name"),
  email: z.string().email("not valid email"),
});

export type Person = z.infer<typeof PersonSchema>;
