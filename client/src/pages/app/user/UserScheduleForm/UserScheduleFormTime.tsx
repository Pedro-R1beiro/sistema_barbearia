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
import { Controller, type Control } from "react-hook-form";
import type { ScheduleFormData } from "./UserScheduleForm";

interface UserScheduleFormTimeProps {
  control: Control<ScheduleFormData>;
  selectedDate: Date;
  selectedServices: number[];
  selectedBarber: string | null | undefined;
}

export function UserScheduleFormTime({
  control,
  selectedDate,
  selectedServices,
  selectedBarber,
}: UserScheduleFormTimeProps) {
  const { data: availableTimeSlots } = useQuery({
    queryKey: ["appointment", selectedDate, selectedServices],
    queryFn: () =>
      getAvailableTimeSlots({ date: selectedDate, service: selectedServices }),
    enabled: !!selectedDate && selectedServices.length > 0,
  });

  const available = availableTimeSlots?.filter((available) => {
    return available.id === Number(selectedBarber);
  });
  const timeSlots = available?.flatMap((item) => item.timeSlot);

  return (
    <Controller
      control={control}
      name="time"
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
              <SelectLabel>Horários</SelectLabel>
              {timeSlots &&
                timeSlots.map((time) => {
                  return <SelectItem value={time}>{time}</SelectItem>;
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
