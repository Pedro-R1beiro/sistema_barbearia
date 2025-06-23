import { getAppointment } from "@/api/get-appointment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { AppointmentCard } from "./AppointmentCard";
import { Skeleton } from "@/components/ui/skeleton";

export function AppointmentsCardGroup() {
  const { data: appointmentData, isFetching } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment({}),
  });

  return (
    <>
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
        </CardHeader>
        {isFetching ? (
          <CardContent className="space-y-4 pb-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </CardContent>
        ) : (
          <CardContent className="space-y-4 overflow-auto">
            {appointmentData &&
              appointmentData.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
          </CardContent>
        )}
      </Card>
    </>
  );
}
