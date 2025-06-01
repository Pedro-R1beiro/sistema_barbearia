import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { DatePicker } from "@/components/ui/date-picker";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserScheduleFormServices } from "./UserScheduleFormServices";
import { UserScheduleFormTime } from "./UserScheduleFormTime";
import { useQuery } from "@tanstack/react-query";
import { getAvailableTimeSlots } from "@/api/get-available-time-slots";
import { Card, CardContent } from "@/components/ui/card";

const scheduleFormDataSchema = z.object({
  barber: z.string(),
  services: z.array(z.number()),
  date: z.date(),
  time: z.string(),
});

export type ScheduleFormData = z.infer<typeof scheduleFormDataSchema>;

export function UserScheduleForm() {
  const { handleSubmit, control, watch } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormDataSchema),
    defaultValues: {
      barber: "",
      services: [],
      date: new Date(),
    },
  });

  const selectedDate = watch("date");
  const selectedServices = watch("services");
  const selectedBarber = watch("barber");

  const { data: availableTimeSlots } = useQuery({
    queryKey: ["appointment", selectedDate, selectedServices],
    queryFn: () =>
      getAvailableTimeSlots({ date: selectedDate, service: selectedServices }),
    enabled: !!selectedDate && selectedServices.length > 0,
  });

  function onSubmit(data: ScheduleFormData) {
    console.log(data);
  }

  return (
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
          <Controller
            control={control}
            name="barber"
            render={({ field: { name, onChange, value, disabled } }) => (
              <Select
                name={name}
                value={value}
                onValueChange={onChange}
                disabled={disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar barbeiro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Barbeiros</SelectLabel>
                    {availableTimeSlots &&
                      availableTimeSlots.map((available) => {
                        return (
                          <SelectItem
                            key={available.id}
                            value={available.id.toString()}
                          >
                            {available.name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
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
          <UserScheduleFormTime
            control={control}
            selectedDate={selectedDate}
            selectedServices={selectedServices}
            selectedBarber={selectedBarber}
          />
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
  );
}
