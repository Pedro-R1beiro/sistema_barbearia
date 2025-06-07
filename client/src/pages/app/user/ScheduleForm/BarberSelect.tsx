import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, type Control, type UseFormWatch } from "react-hook-form";
import type { ScheduleFormData } from ".";
import { useQuery } from "@tanstack/react-query";
import { getAvailableTimeSlots } from "@/api/get-available-time-slots";

interface UserScheduleFormBarberProps {
  control: Control<ScheduleFormData>;
  watch: UseFormWatch<ScheduleFormData>;
}

export function BarberSelect({ control, watch }: UserScheduleFormBarberProps) {
  const selectedDate = watch("date");
  const selectedServices = watch("services");

  const { data: availableTimeSlots } = useQuery({
    queryKey: ["available-appointments", selectedDate, selectedServices],
    queryFn: () =>
      getAvailableTimeSlots({ date: selectedDate, service: selectedServices }),
    enabled: !!selectedDate && selectedServices.length > 0,
  });

  return (
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
  );
}
