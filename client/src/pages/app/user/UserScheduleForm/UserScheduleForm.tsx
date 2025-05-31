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
import { useState } from "react";

const scheduleFormDataSchema = z.object({
  barber: z.string(),
  services: z.array(z.number()),
  date: z.date(),
});

export type ScheduleFormData = z.infer<typeof scheduleFormDataSchema>;

export function UserScheduleForm() {
  const [date, setDate] = useState<Date>(new Date());

  const { register, handleSubmit, control } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormDataSchema),
    defaultValues: {
      barber: "",
      services: [],
      date: date,
    },
  });

  function onSubmit(data: ScheduleFormData) {
    console.log(data);
  }

  const options = [
    { value: "a", label: "José Alfredo 1" },
    { value: "b", label: "SJosé Alfredo 2" },
    { value: "c", label: "José Alfredo 3" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7 border-b-2 border-b-black pb-8 lg:max-w-2xl lg:flex-1 lg:border-b-0"
    >
      <h1 className="text-center text-xl font-bold sm:text-2xl">
        Adicionar um novo agendamento
      </h1>
      <div>
        <div>
          <h3 className="text-lg font-bold">Selecione uma data</h3>
          <input
            className="hidden"
            value={date.toDateString()}
            {...register("date")}
          />
          <DatePicker date={date} setDate={setDate} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold">Selecione serviços</h3>
        <UserScheduleFormServices control={control} />
      </div>

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
                  {options.map((option) => {
                    return (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

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
