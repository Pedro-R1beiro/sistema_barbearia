import { getAppointment } from "@/api/get-appointment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

export function NextAppointmentsCard() {
  const { data: nextAppointmentsData } = useQuery({
    queryKey: ["next-appointments"],
    queryFn: () => getAppointment("nearby"),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <Card className="bg-custom-foreground text-background md:flex-1">
      <CardContent className="px-4">
        <div className="flex items-start justify-between pr-2">
          <CardTitle className="text-xl font-bold">
            Próximos agendamentos
          </CardTitle>
          <FontAwesomeIcon icon={faCalendarDays} className="text-3xl" />
        </div>
        <div className="mt-3 flex items-center justify-between text-lg">
          {nextAppointmentsData && nextAppointmentsData?.length >= 1 ? (
            <span className="font-medium">
              {nextAppointmentsData?.length} agendamento(s) para os próximos
              dias.
            </span>
          ) : (
            <span className="font-medium">sem agendamento marcados.</span>
          )}

          <Button variant="secondary" className="px-7 py-5.5">
            VER
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
