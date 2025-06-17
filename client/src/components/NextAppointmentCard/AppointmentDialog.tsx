import { getAppointment } from "@/api/get-appointment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { formatDateUtc } from "@/utils/formatDateUtc";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

interface AppointmentDialogProps {
  appointmentId: number;
}

export function AppointmentDialog({ appointmentId }: AppointmentDialogProps) {
  const { data: appointmentData } = useQuery({
    queryKey: ["appointments", appointmentId],
    queryFn: () => getAppointment({ filter: "next", status: "booked" }),
  });

  if (!appointmentData) return <Skeleton className="h-8 w-full" />;

  const appointment = appointmentData.filter(
    (appointment) => appointment.id === appointmentId,
  )[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex-1 py-5 font-bold md:w-auto md:py-3 lg:flex-none lg:py-5">
          Ver mais informações
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do seu próximo horário</DialogTitle>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Horário:</TableHead>
              <TableCell className="text-right">
                {appointment.startTime}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Horário de término:</TableHead>
              <TableCell className="text-right">
                {appointment.endTime}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Data:</TableHead>
              <TableCell className="text-right">
                {formatDateUtc(appointment.date, "dd 'de' MMMM Y")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Marcado na data:</TableHead>
              <TableCell className="text-right">
                {formatDateUtc(appointment.created_at.date, "dd 'de' MMMM Y")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Barbeiro:</TableHead>
              <TableCell className="text-right">
                {appointment.professionalName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Serviço:</TableHead>
              <TableCell className="text-right">
                {appointment.serviceName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Preço do serviço:</TableHead>
              <TableCell className="text-right">
                R$ {appointment.servicePrice}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
