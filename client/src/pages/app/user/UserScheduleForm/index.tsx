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

const scheduleFormDataSchema = z.object({
  barber: z.string(),
  services: z.array(z.number()),
  date: z.date(),
  startTime: z.string(),
});

export type ScheduleFormData = z.infer<typeof scheduleFormDataSchema>;

export function UserScheduleForm() {
  const { handleSubmit, control, watch } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormDataSchema),
    defaultValues: {
      barber: "",
      services: [],
      startTime: "",
      date: new Date(),
    },
  });

  const { mutateAsync: registerAppointmentFn } = useMutation({
    mutationFn: registerAppointment,
  });

  const selectedBarber = watch("barber");
  const selectedServices = watch("services");

  function onSubmit(data: ScheduleFormData) {
    registerAppointmentFn({
      date: data.date,
      idProfessional: Number(data.barber),
      service: data.services,
      startTime: data.startTime,
    });
  }

  return (
    <div className="space-y-12 pb-16 lg:flex lg:items-center lg:justify-center lg:pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-7 pb-8 lg:max-w-2xl lg:flex-1 lg:border-b-0"
      >
        <h1 className="text-center text-xl font-bold sm:text-2xl">
          Adicionar um novo agendamento
        </h1>
        <div>
          <div>
            <h3 className="text-lg font-bold">Selecione uma data</h3>
            <DatePicker control={control} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Selecione serviços</h3>
          <UserScheduleFormServices control={control} />
        </div>

        {selectedServices.length >= 1 ? (
          <div>
            <h3 className="text-lg font-bold">Selecione um barbeiro</h3>
            <UserScheduleFormBarber control={control} watch={watch} />
          </div>
        ) : (
          <Card>
            <CardContent>
              <p>
                Selecione horário e data para ver os profissionais disponíveis.
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
          <Card>
            <CardContent>
              <p>Selecione um barbeiro para ver os horários disponiveis.</p>
            </CardContent>
          </Card>
        )}

        <div className="flex w-full items-center justify-between">
          <span className="text-xl font-bold">Total</span>
          <span>33,90</span>
        </div>
        <Button type="submit" className="w-full py-6 font-bold">
          Adicionar novo agendamento
        </Button>
      </form>
    </div>
  );
}
