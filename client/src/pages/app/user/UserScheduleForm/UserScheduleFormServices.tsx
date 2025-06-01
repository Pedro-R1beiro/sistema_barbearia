import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, type Control } from "react-hook-form";
import type { ScheduleFormData } from ".";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/api/get-services";

interface UserScheduleFormServicesProps {
  control: Control<ScheduleFormData>;
}

export function UserScheduleFormServices({
  control,
}: UserScheduleFormServicesProps) {
  const { data: serviceOptions } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

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
          <Card className="p-0">
            <CardContent className="scrollbar-custom max-h-50 overflow-auto p-4">
              {serviceOptions &&
                serviceOptions.map((service) => {
                  return (
                    <label
                      htmlFor={service.name}
                      className="border-b-background hover:bg-background flex w-full items-center justify-between border-b-[1px] p-3 pb-3 leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="w-40">{service.name}</span>
                      <span className="w-40">{service.price}</span>

                      <Checkbox
                        name="services"
                        onCheckedChange={() => toggleService(service.id)}
                        id={service.name}
                        value={service.id}
                      />
                    </label>
                  );
                })}
            </CardContent>
          </Card>
        );
      }}
    />
  );
}
