import { getAppointment } from "@/api/get-appointment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateRequest } from "@/utils/formatDateRequest";
import { remainingTime } from "@/utils/remaining-time";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentCardFooter } from "./AppointmentCardFooter";

export function NextAppointmentCard() {
  const { data: nextAppointmentData } = useQuery({
    queryKey: ["next-appointment"],
    queryFn: () => getAppointment("next"),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (!nextAppointmentData) return;
  const nextAppointment = nextAppointmentData[0];

  const formatedDate = formatDateRequest(nextAppointment.date);

  return (
    <Card className="shadow-2xl lg:min-w-85">
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl lg:text-xl">
          Próximo Horário marcado
        </CardTitle>
      </CardHeader>
      <div className="md:flex md:flex-row md:justify-between md:gap-6 lg:flex-col">
        <CardContent className="flex flex-col gap-6">
          <div className="flex h-full flex-col gap-6 md:justify-between">
            <div>
              <ul>
                <li>
                  <p>
                    <span className="font-bold">Data</span>:{" "}
                    {format(formatedDate, "PPPP", {
                      locale: ptBR,
                    })}
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-bold">Horário</span>:{" "}
                    {nextAppointment.startTime}
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <p>
                <span className="block text-2xl font-bold">
                  {remainingTime({
                    startDate: nextAppointment.date,
                    startTime: nextAppointment.startTime,
                  })}
                </span>
                para seu serviço
              </p>
            </div>

            <div>
              <span className="block text-2xl font-bold">Total</span>
              <span>R$ {nextAppointment.servicePrice}</span>
            </div>
          </div>
        </CardContent>
        <div className="bg-foreground hidden min-h-full min-w-px md:block lg:hidden" />
        <div className="bg-foreground mx-auto my-4 min-h-px w-75 max-w-full md:my-0 md:hidden lg:block" />
        <AppointmentCardFooter id={nextAppointment.id} />
      </div>
    </Card>
  );
}
