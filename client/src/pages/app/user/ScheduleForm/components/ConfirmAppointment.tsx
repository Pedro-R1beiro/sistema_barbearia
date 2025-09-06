import { useFormContext } from "react-hook-form";

import { SelectedAppointmentsTable } from "./SelectedAppointmentsTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ScheduleFormData } from "@/schemas/schedule-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eraser, PlusIcon } from "lucide-react";

interface ConfirmAppointmentProps {
  isSubmitting: boolean;
}

export function ConfirmAppointment({ isSubmitting }: ConfirmAppointmentProps) {
  const { watch, reset } = useFormContext<ScheduleFormData>();

  const selectedDate = watch("date");
  const selectedStartTime = watch("startTime");

  const selectedServices = watch("services").filter(
    (servicer) => servicer.enabled,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center mt-2.5">
          Revisão do agendamento
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex justify-between sm:px-10">
        <div className="max-h-[150px] overflow-auto">
          <SelectedAppointmentsTable selectedServices={selectedServices} />
        </div>
        <div className="text-center space-y-2 text-sm">
          <div className="space-x-2">
            <span className="text-muted-foreground font-bold">Data: </span>
            <span>{selectedDate && format(selectedDate, "dd'/'MM")}</span>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground font-bold">Ano: </span>
            <span>{selectedDate && format(selectedDate, "yyyy")}</span>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground font-bold">Horário: </span>
            <span>{selectedStartTime}</span>
          </div>
          <div className="w-30 mx-auto rounded-md capitalize text-muted-foreground mt-3 border-1 px-2 font-medium text-sm py-2">
            {selectedDate &&
              format(selectedDate, "E dd 'de' MMMM", {
                locale: ptBR,
              })}
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col items-end px-6.5 sm:px-10 pb-4 md:pt-0">
        <div className="w-full flex justify-between">
          <span className="text-muted-foreground font-bold">Total:</span>
          <span className="font-bold">R$ 112,50</span>
        </div>
        <div className="space-y-4 mt-3 w-full">
          <Button
            type="submit"
            variant="action"
            disabled={isSubmitting}
            className="w-full py-5"
          >
            {isSubmitting ? (
              "agendando..."
            ) : (
              <>
                confirmar agendamento
                <PlusIcon />
              </>
            )}
          </Button>
          <Button
            onClick={() =>
              reset({
                barberId: "",
                services: watch("services").map((s) => {
                  return { ...s, enabled: false };
                }),
                date: new Date(),
                startTime: "",
              })
            }
            type="button"
            variant="outline"
            className="w-full py-5"
          >
            resetar todos os campos
            <Eraser />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
