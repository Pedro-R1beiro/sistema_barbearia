import type { Dispatch, ReactNode, SetStateAction } from "react";

import { AppointmentDialogSkeleton } from "./AppointmentDialogSkeleton";
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
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatDateUtc } from "@/utils/format-date-utc";
import { useQuery } from "@tanstack/react-query";

interface AppointmentDialogProps {
  appointmentId: number;
  children: ReactNode;
  className?: string;
  isOpenDetails: boolean;
  setIsOpenDetails: Dispatch<SetStateAction<boolean>>;
  asChild?: boolean;
}

export function AppointmentDialog({
  appointmentId,
  children,
  className,
  isOpenDetails,
  setIsOpenDetails,
  asChild = false,
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

  const totalPrice = appointment?.services.reduce((acc, cur) => {
    return acc + Number(cur.price);
  }, 0);

  return (
    <Dialog onOpenChange={setIsOpenDetails} open={isOpenDetails}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "w-full flex-1 py-4 font-bold md:w-auto md:py-3 lg:flex-none lg:py-5",
            className,
          )}
          asChild={asChild}
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
                      {formatDateUtc(appointment.date, "dd 'de' MMMM y")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Marcado na data:</TableHead>
                    <TableCell className="text-right">
                      {formatDateUtc(
                        appointment.created_at.date,
                        "dd 'de' MMMM y",
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
                    <TableHead>Preço do serviço:</TableHead>
                    <TableCell className="text-right">
                      R$ {totalPrice?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="max-w-[100%] overflow-hidden text-center font-medium break-words whitespace-pre-wrap"
                >
                  <span className="text-center font-semibold">Serviços: </span>

                  <div className="inline-block pt-2 text-sm text-wrap">
                    {appointment?.services.map((service, index) => (
                      <span key={index} className="font-normal">
                        {service.name} ({service.price})
                        {index < appointment.services.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
}
