import { getAppointment } from "@/api/get-appointment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { AppointmentCardGroup } from "./AppointmentCard";
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
          <CardTitle className="text-center">
            Histórico de agendamentos
          </CardTitle>
        </CardHeader>
        {isFetching ? (
          <CardContent className="space-y-4 pb-8">
            {Array.from({ length: 2 }).map(() => (
              <Skeleton className="h-48 w-full" />
            ))}
          </CardContent>
        ) : (
          <CardContent className="space-y-4 overflow-auto">
            {appointmentData &&
              appointmentData.map((appointment) => (
                <AppointmentCardGroup appointment={appointment} />
              ))}
          </CardContent>
        )}
      </Card>
    </>
  );
}
