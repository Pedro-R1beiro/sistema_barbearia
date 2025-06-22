import { getAppointment } from "@/api/get-appointment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { AppointmentCardGroup } from "./AppointmentCard";

export function AppointmentsCardGroup() {
  const { data: appointmentData } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment({}),
  });

  return (
    <Card className="max-h-132 w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center">Histórico de agendamentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto">
        {appointmentData &&
          appointmentData.map((appointment) => (
            <AppointmentCardGroup appointment={appointment} />
          ))}
      </CardContent>
    </Card>
  );
}
