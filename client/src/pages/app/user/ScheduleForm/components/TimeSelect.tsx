import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getAvailableTimeSlots,
  type BarberAvailabilityStatus,
} from "@/api/get-available-time-slots";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Controller, type Control, type UseFormWatch } from "react-hook-form";
import type { ScheduleFormData } from "..";

interface UserScheduleFormTimeProps {
  control: Control<ScheduleFormData>;
  watch: UseFormWatch<ScheduleFormData>;
}

export function TimeSelect({ control, watch }: UserScheduleFormTimeProps) {
  const selectedBarber = watch("barber");
  const selectedServices = watch("services");
  const selectedDate = watch("date");

  const { data: availableTimeSlots, isFetching } = useQuery({
    queryKey: ["appointment", selectedDate, selectedServices],
    queryFn: () =>
      getAvailableTimeSlots({ date: selectedDate, service: selectedServices }),
    enabled: !!selectedDate && selectedServices.length > 0,
  });

  const available = availableTimeSlots?.filter((available) => {
    return available.id === Number(selectedBarber);
  });

  const timeSlots = available?.flatMap((item) => item.timeSlot);
  const availableStatusMap: Record<BarberAvailabilityStatus, string> = {
    available: "Horários disponíveis",
    day_off: "Barbeiro de folga neste dia",
    fully_booked: "Dia com horários preenchidos",
    not_working: "Barberia fechada neste dia",
    on_vacation: "Barbeiro de férias nesta dia",
  };

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
              {isFetching ? (
                <div className="space-y-4 py-3">
                  <Skeleton className="h-5.5 w-full" />
                  <Skeleton className="h-5.5 w-full" />
                  <Skeleton className="h-5.5 w-full" />
                  <Skeleton className="h-5.5 w-full" />
                </div>
              ) : (
                <>
                  {" "}
                  {timeSlots && timeSlots.length >= 1 ? (
                    <>
                      <SelectLabel>Horários</SelectLabel>
                      {timeSlots &&
                        timeSlots.map((time) => {
                          return (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          );
                        })}
                    </>
                  ) : (
                    <SelectLabel>
                      {available && availableStatusMap[available[0].status]}
                    </SelectLabel>
                  )}
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
