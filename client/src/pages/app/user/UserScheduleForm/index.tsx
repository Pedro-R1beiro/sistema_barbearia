import { Button } from "@/components/ui/button";

import { DatePicker } from "@/components/ui/date-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserScheduleFormServices } from "./UserScheduleFormServices";
import { UserScheduleFormTime } from "./UserScheduleFormTime";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { registerAppointment } from "@/api/register-appointment";
import { UserScheduleFormBarber } from "./UserScheduleFormBarber";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

const scheduleFormDataSchema = z.object({
  barber: z.string(),
  services: z.array(z.number()),
  date: z.date(),
  startTime: z.string(),
});

export type ScheduleFormData = z.infer<typeof scheduleFormDataSchema>;

export function UserScheduleForm() {
  const { handleSubmit, control, watch, reset } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormDataSchema),
    defaultValues: {
      barber: "",
      services: [],
      startTime: "",
      date: new Date(),
    },
  });

  const selectedBarber = watch("barber");
  const selectedServices = watch("services");
  const selectedDate = watch("date");

  const { mutateAsync: registerAppointmentFn } = useMutation({
    mutationFn: registerAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["available-appointments", "next-appointment", selectedDate],
      });
    },
  });

  async function onSubmit(data: ScheduleFormData) {
    try {
      await registerAppointmentFn({
        date: data.date,
        idProfessional: Number(data.barber),
        service: data.services,
        startTime: data.startTime,
      });

      reset();

      toast.success("Agendamento feito com sucesso!");
    } catch (err) {
      toast.error("Horário não disponível!");
      console.log(err);
    }
  }

  return (
    <div className="w-full space-y-12 pb-16 lg:pt-10">
      <h1 className="text-center text-xl font-bold sm:text-2xl">
        Adicionar um novo agendamento
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-full space-y-7 pb-8 lg:flex lg:max-w-2xl lg:flex-1 lg:items-center lg:justify-center lg:gap-15"
      >
        <div className="space-y-7 lg:flex-1">
          <div>
            <h3 className="text-lg font-bold">Selecione uma data</h3>
            <DatePicker control={control} />
          </div>

          <div>
            <h3 className="text-lg font-bold">Selecione serviços</h3>
            <UserScheduleFormServices control={control} />
          </div>
        </div>

        <div className="space-y-7 lg:w-120">
          {selectedServices.length >= 1 ? (
            <div>
              <h3 className="text-lg font-bold">Selecione um barbeiro</h3>
              <UserScheduleFormBarber control={control} watch={watch} />
            </div>
          ) : (
            <Card className="p-2.5">
              <CardContent className="px-2">
                <p>
                  Selecione horário e data para ver os profissionais
                  disponíveis.
                </p>
              </CardContent>
            </Card>
          )}

          {selectedBarber && selectedServices.length >= 1 ? (
            <div>
              <h3 className="text-lg font-bold">Selecione um horário</h3>
              <UserScheduleFormTime control={control} watch={watch} />
            </div>
          ) : (
            <Card className="p-2.5">
              <CardContent className="px-2">
                <p>Selecione um barbeiro para ver os horários disponiveis.</p>
              </CardContent>
            </Card>
          )}

          <div className="flex w-full items-center justify-between">
            <span className="text-xl font-bold">Total:</span>
            <span>33,90</span>
          </div>
          <Button type="submit" className="w-full py-6 font-bold">
            Adicionar novo agendamento
          </Button>
        </div>
      </form>
    </div>
  );
}
