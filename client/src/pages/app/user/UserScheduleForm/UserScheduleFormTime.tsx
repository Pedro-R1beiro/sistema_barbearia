import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAvailableTimeSlots } from "@/api/get-available-time-slots";

import { useQuery } from "@tanstack/react-query";
import { Controller, type Control, type UseFormWatch } from "react-hook-form";
import type { ScheduleFormData } from ".";

interface UserScheduleFormTimeProps {
  control: Control<ScheduleFormData>;
  watch: UseFormWatch<ScheduleFormData>;
}

export function UserScheduleFormTime({
  control,
  watch,
}: UserScheduleFormTimeProps) {
  const selectedBarber = watch("barber");
  const selectedServices = watch("services");
  const selectedDate = watch("date");

  const { data: availableTimeSlots } = useQuery({
    queryKey: ["appointment", selectedDate, selectedServices],
    queryFn: () =>
      getAvailableTimeSlots({ date: selectedDate, service: selectedServices }),
    enabled: !!selectedDate && selectedServices.length > 0,
  });

  const available = availableTimeSlots?.filter((available) => {
    return available.id === Number(selectedBarber);
  });
  console.log(available);
  const timeSlots = available?.flatMap((item) => item.timeSlot);

  return (
    <Controller
      control={control}
      name="startTime"
      render={({ field: { name, onChange, value, disabled } }) => (
        <Select
          name={name}
          value={value}
          onValueChange={onChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecionar horário" />
          </SelectTrigger>
          <SelectContent className="max-h-70">
            <SelectGroup>
              {timeSlots && timeSlots.length >= 1 ? (
                <SelectLabel>Horários</SelectLabel>
              ) : (
                <SelectLabel>Profissional sem horários disponíveis</SelectLabel>
              )}

              {timeSlots &&
                timeSlots.map((time) => {
                  return (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
