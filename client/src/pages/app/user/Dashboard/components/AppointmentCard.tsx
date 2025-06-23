import type { AppointmentInterface } from "@/api/get-appointment";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { AppointmentStatus } from "@/components/AppointmentStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";

import barberTable from "@/assets/barber-table.svg";

interface AppointmentGroupProps {
  appointment: AppointmentInterface;
}

export function AppointmentCard({ appointment }: AppointmentGroupProps) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  return (
    <Card className="bg-background relative overflow-hidden border-none">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${barberTable})` }}
      />
      <div className="bg-background/85 absolute inset-0 z-10 backdrop-blur-[0.075rem]" />

      <CardContent className="relative z-20 flex justify-between">
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
      <CardFooter className="relative z-20 min-w-full">
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
