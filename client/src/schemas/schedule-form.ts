import { z } from "zod";

export const scheduleFormDataSchema = z.object({
  barberId: z.string().min(1, "Selecione um barbeiro"),
  startTime: z.string().min(5, "Selecione um horário"),
  date: z.date(),
  services: z
    .array(
      z.object({
        id: z.number(),
        enabled: z.boolean(),
        name: z.string(),
        price: z.string(),
        duration: z.number(),
        active: z.number(),
      }),
    )
    .transform((services) => services.filter((service) => service.enabled))
    .refine((services) => services.length > 0, {
      message: "Voce precisa selecionar pelo menos um serviço!",
    }),
});

export type ScheduleFormData = z.infer<typeof scheduleFormDataSchema>;
