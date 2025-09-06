import z from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Mínimo de 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  currentPassword: z.string().min(8, "Mínimo de 8 caracteres"),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "Telefone deve ter entre 10 e 11 dígitos",
    }),
});

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
