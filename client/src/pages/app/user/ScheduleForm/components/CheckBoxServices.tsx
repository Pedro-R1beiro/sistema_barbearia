import { type Control, Controller } from "react-hook-form";

import type { ScheduleFormData } from "..";
import { getServices } from "@/api/get-services";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

interface UserScheduleFormServicesProps {
  control: Control<ScheduleFormData>;
}

export function SelectServices({ control }: UserScheduleFormServicesProps) {
  const { data: serviceOptions, isFetching } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <>
      {isFetching ? (
        <Card className="py-3">
          <CardContent className="space-y-3 p-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      ) : (
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
              <Card className="h-full p-2">
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
                            checked={value?.includes(service.id)}
                          />
                        </label>
                      );
                    })}
                </CardContent>
              </Card>
            );
          }}
        />
      )}
    </>
  );
}
