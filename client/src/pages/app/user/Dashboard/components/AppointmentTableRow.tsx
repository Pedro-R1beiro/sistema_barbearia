import type { AppointmentInterface } from "@/api/get-appointment";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { AppointmentStatus } from "@/components/AppointmentStatus";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface AppointmentTableRowProps {
  appointment: AppointmentInterface;
}

export function AppointmentTableRow({ appointment }: AppointmentTableRowProps) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  return (
    <TableRow key={appointment.id} className="text-foreground border-spacing-6">
      <TableCell className="bg-background rounded-l-md font-medium">
        {appointment.professionalName}
      </TableCell>
      <TableCell className="bg-background w-[90px]">
        {formatDistanceToNow(appointment.date, {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>
      <TableCell className="bg-background w-[90px]">
        <AppointmentStatus status={appointment.status} />
      </TableCell>
      <TableCell className="bg-background w-[90px]">
        {appointment.status === "booked" && (
          <Button variant="destructive" className="w-full">
            Cancelar
          </Button>
        )}
      </TableCell>
      <TableCell className="bg-background w-[90px] rounded-r-md text-right">
        <AppointmentDialog
          isOpenDetails={isOpenDetails}
          setIsOpenDetails={setIsOpenDetails}
          className="min-w-full font-medium"
          appointmentId={appointment.id}
        >
          ver
        </AppointmentDialog>
      </TableCell>
    </TableRow>
  );
}
