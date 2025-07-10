"use client";

import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, type Control } from "react-hook-form";
import type { ScheduleFormData } from "@/pages/app/user/ScheduleForm";

interface DatePickerProps {
  control: Control<ScheduleFormData>;
}

export function DatePicker({ control }: DatePickerProps) {
  return (
    <Controller
      control={control}
      name="date"
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {field.value ? (
                format(field.value, "PPPP", { locale: ptBR })
              ) : (
                <span>Escolha uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              locale={ptBR}
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date <= subDays(new Date(), 1)}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
