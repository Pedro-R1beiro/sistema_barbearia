import { getAppointment } from "@/api/get-appointment";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { AppointmentStatus } from "@/components/AppointmentStatus";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function AppointmentsTable() {
  const { data: appointmentData } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment({}),
  });

  return (
    <div className="bg-custom-foreground text-background row-2 mt-8 max-h-[380px] overflow-auto rounded-md p-4">
      <Table className="border-separate border-spacing-x-0 border-spacing-y-2">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-background rounded-l-md text-lg">
              Barbeiro
            </TableHead>
            <TableHead className="bg-background text-lg">Data</TableHead>
            <TableHead className="bg-background text-lg">Situação</TableHead>
            <TableHead className="bg-background w-[90px] text-lg"></TableHead>
            <TableHead className="bg-background w-[70px] rounded-r-md text-right text-lg"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-foreground">
          {appointmentData &&
            appointmentData.map((appointment) => (
              <TableRow
                key={appointment.id}
                className="text-foreground border-spacing-6"
              >
                <TableCell className="bg-background rounded-l-md font-medium">
                  {appointment.professionalName}
                </TableCell>
                <TableCell className="bg-background">
                  {formatDistanceToNow(appointment.date, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell className="bg-background">
                  <AppointmentStatus status={appointment.status} />
                </TableCell>
                <TableCell className="bg-background w-[90px]">
                  <AppointmentDialog
                    className="min-w-full text-sm"
                    appointmentId={appointment.id}
                  >
                    ver
                  </AppointmentDialog>
                </TableCell>
                <TableCell className="bg-background rounded-r-md text-right">
                  <Button variant="destructive" className="w-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
