import type { AppointmentInterface } from "@/api/get-appointment";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { AppointmentStatus } from "@/components/AppointmentStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";

interface AppointmentCardGroupProps {
  appointment: AppointmentInterface;
}

export function AppointmentCardGroup({
  appointment,
}: AppointmentCardGroupProps) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  return (
    <Card className="bg-background border-none">
      <CardContent className="flex justify-between">
        <ul>
          <li>
            <span className="font-medium">Data:</span>{" "}
            <span className="font-light">
              {format(appointment.date, "dd/MM/yyyy")}
            </span>
          </li>
          <li>
            <span className="font-medium">Horário:</span>{" "}
            <span className="font-light">{appointment.startTime}</span>
          </li>
          <li>
            <span className="font-medium">preço:</span>{" "}
            <span className="font-light">{appointment.servicePrice}</span>
          </li>
          <li>
            <span className="font-medium">Qtd. serviços:</span>{" "}
            <span className="font-light">1</span>
          </li>
        </ul>
        <div className="flex flex-col gap-3">
          <AppointmentStatus status={appointment.status} />
          {appointment.status === "booked" ? (
            <Button variant="destructive" size="sm">
              cancelar
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="bg-background border-1 dark:border-black"
            >
              arquivar
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="min-w-full">
        <AppointmentDialog
          appointmentId={appointment.id}
          isOpenDetails={isOpenDetails}
          setIsOpenDetails={setIsOpenDetails}
          className="min-w-full py-0 md:py-0 lg:py-0"
        >
          ver
        </AppointmentDialog>
      </CardFooter>
    </Card>
  );
}
