import { Controller, useFormContext } from "react-hook-form";

import { getAvailableTimeSlots } from "@/api/get-available-time-slots";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ScheduleFormData } from "@/schemas/schedule-form";
import { useQuery } from "@tanstack/react-query";

export function TimeSelect() {
  // const availableStatusMap: Record<BarberAvailabilityStatus, string> = {
  //   available: "Horários disponíveis",
  //   day_off: "Barbeiro de folga neste dia",
  //   fully_booked: "Dia com horários preenchidos",
  //   not_working: "Barberia fechada neste dia",
  //   on_vacation: "Barbeiro de férias nesta dia",
  // };
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<ScheduleFormData>();

  const date = watch("date");
  const services = watch("services")
    .filter((service) => service.enabled)
    .map((s) => s.id);

  const { data: availableTimeSlots, isLoading } = useQuery({
    queryKey: ["available-time-slots", { date, services }],
    queryFn: () => getAvailableTimeSlots({ date, services }),
    enabled: !!date && services.length > 0,
  });

  const timeSlots = Array.from(
    new Set(availableTimeSlots?.flatMap((item) => item.timeSlot ?? []) || []),
  );

  return (
    <div className="w-full space-y-1.5">
      <h3 className="font-semibold">Selecione um horário</h3>
      <Controller
        name="startTime"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className={cn(
                "w-full",
                errors.startTime && "border border-destructive",
              )}
            >
              <SelectValue placeholder="Selecionar horário" />
            </SelectTrigger>
            <SelectContent className="max-h-70">
              <SelectGroup>
                <SelectLabel>Horários</SelectLabel>
                {isLoading ? (
                  <div className="space-y-4 py-3">
                    <Skeleton className="h-5.5 w-full" />
                    <Skeleton className="h-5.5 w-full" />
                  </div>
                ) : (
                  timeSlots?.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.startTime && (
        <p className="text-destructive text-sm">{errors.startTime.message}</p>
      )}
    </div>
  );
}
