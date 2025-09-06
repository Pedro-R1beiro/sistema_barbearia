import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { BarberSelect } from "./components/BarberSelect";
import { CheckBoxServices } from "./components/CheckBoxServices";
import { ConfirmAppointment } from "./components/ConfirmAppointment";
import { DatePicker } from "./components/DatePicker";
import { TimeSelect } from "./components/TimeSelect";
import { getServices } from "@/api/get-services";
import { useCreateAppointment } from "@/hooks/useCreateAppointment";
import {
  type ScheduleFormData,
  scheduleFormDataSchema,
} from "@/schemas/schedule-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

export function ScheduleForm() {
  const { data: services, isLoading: loadingServices } = useQuery({
    queryFn: getServices,
    queryKey: ["services"],
  });

  const { registerAppointmentFn } = useCreateAppointment();

  const defaultServices = services?.map((s) => {
    return { ...s, enabled: false };
  });

  const methods = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormDataSchema),
    defaultValues: {
      barberId: "",
      startTime: "",
      date: new Date(),
      services: defaultServices || [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (services) {
      const defaultServices = services.map((s) => ({ ...s, enabled: false }));
      reset({
        barberId: "",
        startTime: "",
        date: new Date(),
        services: defaultServices,
      });
    }
  }, [services, reset]);

  async function handleCreateAppointment(data: ScheduleFormData) {
    await registerAppointmentFn({
      date: data.date,
      startTime: data.startTime,
      idProfessional: Number(data.barberId),
      service: data.services.filter((s) => s.enabled).map((s) => s.id),
    });

    reset({
      barberId: "",
      startTime: "",
      date: new Date(),
      services: defaultServices,
    });
  }

  return (
    <div className="w-full space-y-12 pb-16 lg:pt-8">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-bold sm:text-2xl">
          Adicionar um novo agendamento
        </h1>
        <p className="text-muted-foreground">
          Selecione uma data e um serviço para ver os horários e barbeiros
          disponíveis
        </p>
      </div>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleCreateAppointment)}
            className="space-y-7 pb-8 lg:gap-15 grid min-w-full gap-7 grid-cols-1 md:grid-cols-[minmax(0,460px)_minmax(0,460px)] justify-center"
          >
            <div className="space-y-7 lg:flex-1">
              <DatePicker />

              <CheckBoxServices isLoading={loadingServices} />
              <BarberSelect />
              <TimeSelect />
            </div>
            <ConfirmAppointment isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
