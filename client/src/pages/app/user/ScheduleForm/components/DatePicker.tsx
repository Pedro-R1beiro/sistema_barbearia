import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ScheduleFormData } from "@/schemas/schedule-form";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

export function DatePicker() {
  const { register, setValue, watch } = useFormContext<ScheduleFormData>();
  const date = watch("date");

  return (
    <div className="w-full space-y-1.5">
      <h3 className="font-semibold">Selecione uma data</h3>
      <input type="hidden" {...register("date")} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            {date ? (
              format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
            ) : (
              <span>Selecione uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date ? date : new Date()}
            onSelect={(val) => {
              if (val) {
                setValue("date", val, { shouldValidate: true });
              }
            }}
            locale={ptBR}
            disabled={(day) => day <= subDays(new Date(), 1)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
