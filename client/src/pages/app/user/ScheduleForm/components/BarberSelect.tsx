import { useFormContext } from "react-hook-form";

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

export function BarberSelect() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ScheduleFormData>();

  const date = watch("date");
  const services = watch("services")
    .filter((service) => service.enabled)
    .map((service) => service.id);

  const { data: availableTimeSlots, isLoading } = useQuery({
    queryKey: ["available-appointments", date, services],
    queryFn: () => getAvailableTimeSlots({ date, services }),
    enabled: !!date && services.length > 0,
  });

  const barberId = watch("barberId");
  return (
    <div className="w-full space-y-1.5">
      <input type="hidden" {...register("barberId")} />
      <h3 className="font-semibold">Selecione um barbeiro</h3>
      <Select
        value={barberId}
        onValueChange={(val) =>
          setValue("barberId", val, { shouldValidate: true })
        }
      >
        <SelectTrigger
          className={cn("w-full", errors.barberId && "border-destructive")}
        >
          <SelectValue placeholder="Selecionar barbeiro" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Barbeiros</SelectLabel>
            {isLoading ? (
              <div className="space-y-4 py-3">
                <Skeleton className="h-5.5 w-full" />
                <Skeleton className="h-5.5 w-full" />
                <Skeleton className="h-5.5 w-full" />
                <Skeleton className="h-5.5 w-full" />
              </div>
            ) : (
              <>
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
              </>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.barberId && (
        <p className="text-destructive text-sm">{errors.barberId.message}</p>
      )}
    </div>
  );
}
