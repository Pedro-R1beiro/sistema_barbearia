import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

export type SignInData = z.infer<typeof signInSchema>;
