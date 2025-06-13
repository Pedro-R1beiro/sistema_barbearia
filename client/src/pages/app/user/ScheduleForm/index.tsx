import { Button } from "@/components/ui/button";

import { DatePicker } from "@/components/ui/date-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SelectServices } from "./components/CheckBoxServices";
import { TimeSelect } from "./components/TimeSelect";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { registerAppointment } from "@/api/register-appointment";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { BarberSelect } from "./components/BarberSelect";

const scheduleFormDataSchema = z.object({
  barber: z.string().min(1, "Selecione um barbeiro"),
  services: z.array(z.number()).min(1, "Selecione algum serviço"),
  date: z.date(),
  startTime: z.string().min(5, "selecione um horário"),
});

export type ScheduleFormData = z.infer<typeof scheduleFormDataSchema>;

export function ScheduleForm() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormDataSchema),
    defaultValues: {
      barber: "",
      services: [],
      startTime: "",
    },
  });

  const selectedBarber = watch("barber");
  const selectedServices = watch("services");

  const { mutateAsync: registerAppointmentFn } = useMutation({
    mutationFn: registerAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["next-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["available-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["next-appointment"] });
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
        className="min-w-full space-y-7 pb-8 lg:flex lg:max-w-2xl lg:flex-1 lg:items-start lg:justify-center lg:gap-15"
      >
        <div className="space-y-7 lg:flex-1">
          <div>
            <h3 className="text-lg font-bold">Selecione uma data</h3>
            <DatePicker control={control} />
            {errors.date && (
              <p className="text-sm text-red-500 dark:text-red-400">
                Selecione uma data
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold">Selecione serviços</h3>
            <SelectServices control={control} />
            {errors.services && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.services.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-7 lg:w-120">
          {selectedServices.length >= 1 ? (
            <div>
              <h3 className="text-lg font-bold">Selecione um barbeiro</h3>
              <BarberSelect control={control} watch={watch} />
              {errors.barber && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {errors.barber.message}
                </p>
              )}
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
              <TimeSelect control={control} watch={watch} />
              {errors.startTime && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {errors.startTime.message}
                </p>
              )}
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
