import { getAppointment } from "@/api/get-appointment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Archive, Calendar, Check, X } from "lucide-react";

import { AppointmentCard } from "./AppointmentCard";

export function AppointmentsCardGroup() {
  const { data: appointmentData, isFetching } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment({}),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <Card className="max-h-132 w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Histórico de agendamentos
        </CardTitle>
        {!appointmentData && !isFetching && (
          <CardDescription className="text-center">
            Você não tem agendamentos guardados. Verifique os arquivados. obs:
            Os agendamentos marcados não podem ser arquivados
          </CardDescription>
        )}
        <div className="flex items-center justify-between">
          <p>Filtrar por:</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">todos</SelectItem>
              <SelectItem value="booked">
                marcado <Calendar />
              </SelectItem>
              <SelectItem value="canceled">
                cancelado <X />
              </SelectItem>
              <SelectItem value="completed">
                concluído <Check />
              </SelectItem>
              <SelectItem value="achived">
                arquivado <Archive />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      {isFetching ? (
        <CardContent className="space-y-4 pb-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      ) : (
        <CardContent className="items-center justify-center gap-6 space-y-6 overflow-auto md:flex md:flex-wrap md:space-y-0">
          {appointmentData &&
            appointmentData.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </CardContent>
      )}
    </Card>
  );
}
