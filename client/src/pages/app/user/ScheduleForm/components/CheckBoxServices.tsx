import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ScheduleFormData } from "@/schemas/schedule-form";
import { formatPrice } from "@/utils/format-price";

export function CheckBoxServices({ isLoading }: { isLoading: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ScheduleFormData>();
  const { fields } = useFieldArray({
    control,
    name: "services",
  });

  return (
    <div className="w-full space-y-1.5">
      <h3 className="font-semibold">Selecione os serviços</h3>
      <Card
        className={cn(
          "gap-0 py-2 max-h-[174px] overflow-y-auto",
          errors.services && "border border-destructive",
        )}
      >
        {isLoading ? (
          <CardContent className="space-y-3 p-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        ) : (
          <>
            {fields.map((service, index) => (
              <label
                key={index}
                className="flex justify-between items-center space-x-2 px-4 hover:bg-muted py-2 duration-150"
              >
                <div className="flex items-center space-x-8">
                  <Controller
                    control={control}
                    name={`services.${index}.enabled`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <span>{service.name}</span>
                </div>
                <span className="font-medium">
                  {formatPrice(Number(service.price))}
                </span>
              </label>
            ))}
          </>
        )}
      </Card>
      {errors.services && (
        <p className="text-destructive text-sm">
          {errors.services.root?.message}
        </p>
      )}
    </div>
  );
}
