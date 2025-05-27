import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, type Control } from "react-hook-form";
import type { ScheduleFormData } from "./UserScheduleForm";

const serviceOptions = [
  { id: 1, label: "Barba", price: "R$ 12,90" },
  { id: 2, label: "Corte", price: "R$ 21,90" },
  { id: 3, label: "Sobrancelha", price: "R$ 9,90" },
];

interface UserScheduleFormServicesProps {
  control: Control<ScheduleFormData>;
}

export function UserScheduleFormServices({
  control,
}: UserScheduleFormServicesProps) {
  return (
    <Controller
      control={control}
      name="services"
      defaultValue={[]}
      render={({ field }) => {
        const { value, onChange } = field;

        function toggleService(id: number) {
          if (value?.includes(id)) {
            onChange(value.filter((item: number) => item !== id));
            return;
          }

          onChange([...value, id]);
        }

        return (
          <Card>
            <CardContent className="max-h-50 space-y-4 overflow-auto">
              {serviceOptions.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="flex w-full items-center justify-between"
                  >
                    <label
                      htmlFor={service.label}
                      className="flex w-full items-center justify-between leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="w-40">{service.label}</span>
                      <span className="w-40">{service.price}</span>

                      <Checkbox
                        name="services"
                        onCheckedChange={() => toggleService(service.id)}
                        id={service.label}
                        value={service.id}
                      />
                    </label>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      }}
    />
  );
}
