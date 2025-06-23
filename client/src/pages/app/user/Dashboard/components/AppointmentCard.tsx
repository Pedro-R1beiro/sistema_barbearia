import type { AppointmentInterface } from "@/api/get-appointment";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { AppointmentStatus } from "@/components/AppointmentStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";

import barberTable from "@/assets/barber-table.svg";
import { cn } from "@/lib/utils";
import { Archive, Search, Trash } from "lucide-react";

interface AppointmentGroupProps {
  appointment: AppointmentInterface;
}

export function AppointmentCard({ appointment }: AppointmentGroupProps) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const totalPrice = appointment.services.reduce((acc, cur) => {
    return acc + Number(cur.price);
  }, 0);

  return (
    <Card
      className={cn(
        "bg-background hover:scale- relative overflow-hidden duration-300 first:mt-0.5 md:min-w-95 lg:min-w-full",
        appointment.status === "booked" && "border-2 border-amber-400",
        appointment.status === "canceled" && "border-2 border-rose-400",
        appointment.status === "completed" && "border-2 border-teal-400",
      )}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${barberTable})` }}
      />
      <div className="bg-background/92 absolute inset-0 z-10 backdrop-blur-[0.075rem]" />

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
            <span className="font-light">R$ {totalPrice.toFixed(2)}</span>
          </li>
          <li>
            <span className="font-medium">Qtd. serviços:</span>{" "}
            <span className="font-light">{appointment.services.length}</span>
          </li>
        </ul>
        <div className="flex flex-col items-end gap-3">
          <AppointmentStatus status={appointment.status} />
          {appointment.status === "booked" ? (
            <Button variant="destructive" size="sm">
              cancelar
              <Trash />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="bg-background dark:bg-background text-muted-foreground border-1 dark:border-black"
            >
              arquivar <Archive />
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
          asChild={true}
        >
          <Button
            className={cn(
              "text w-full bg-transparent font-semibold hover:bg-transparent",
              appointment.status === "booked" &&
                "bg-amber-400 hover:bg-amber-400/90 hover:shadow-[0_0_10px_2px_rgba(251,191,36,0.6)]",
              appointment.status === "canceled" &&
                "text-foreground border-2 border-rose-400 hover:border-rose-600 hover:shadow-[0_0_10px_2px_rgba(251,113,133,0.6)]",
              appointment.status === "completed" &&
                "bg-teal-400 hover:bg-teal-400/90 hover:shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]",
            )}
          >
            ver detalhes
            <Search />
          </Button>
        </AppointmentDialog>
      </CardFooter>
    </Card>
  );
}

{
  /*  */
}
