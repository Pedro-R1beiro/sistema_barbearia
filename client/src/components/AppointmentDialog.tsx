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
import { formatDateUtc } from "@/utils/format-date-utc";
import { useQuery } from "@tanstack/react-query";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { AppointmentDialogSkeleton } from "./AppointmentDialogSkeleton";

interface AppointmentDialogProps {
  appointmentId: number;
  children: ReactNode;
  className?: string;
  isOpenDetails: boolean;
  setIsOpenDetails: Dispatch<SetStateAction<boolean>>;
}

export function AppointmentDialog({
  appointmentId,
  children,
  className,
  isOpenDetails,
  setIsOpenDetails,
}: AppointmentDialogProps) {
  const { data: appointmentData, isFetching } = useQuery({
    queryKey: [appointmentId, "appointments"],
    queryFn: () => getAppointment({}),
    enabled: isOpenDetails,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const appointment = appointmentData
    ? appointmentData.filter(
        (appointment) => appointment.id === appointmentId,
      )[0]
    : null;

  return (
    <Dialog onOpenChange={setIsOpenDetails} open={isOpenDetails}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "w-full flex-1 py-4 font-bold md:w-auto md:py-3 lg:flex-none lg:py-5",
            className,
          )}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do seu próximo horário</DialogTitle>
        </DialogHeader>
        {isFetching ? (
          <AppointmentDialogSkeleton />
        ) : (
          <Table>
            <TableBody>
              {appointment && (
                <>
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
                      {formatDateUtc(
                        appointment.created_at.date,
                        "dd 'de' MMMM Y",
                      )}
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
                </>
              )}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
}
