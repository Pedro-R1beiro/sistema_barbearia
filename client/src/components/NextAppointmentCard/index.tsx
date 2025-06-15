import { getAppointment } from "@/api/get-appointment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateRequest } from "@/utils/formatDateRequest";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentCardFooter } from "./AppointmentCardFooter";
import { useRemainingTime } from "@/hooks/useRemainingTime";

export function NextAppointmentCard() {
  const { data: nextAppointmentData } = useQuery({
    queryKey: ["next-appointment"],
    queryFn: () => getAppointment("next"),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { date, startTime, servicePrice, id } = nextAppointmentData
    ? nextAppointmentData[0]
    : {
        date: new Date(),
        startTime: "00:00",
        servicePrice: 0,
        id: 0,
      };
  const remainingTime = useRemainingTime({
    startDate: new Date(date),
    startTime,
  });
  if (!nextAppointmentData) return null;

  const formatedDate = formatDateRequest(date);

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
                    <span className="font-bold">Horário</span>: {startTime}
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <p>
                <span className="block text-2xl font-bold">
                  {remainingTime}
                </span>
                para seu serviço
              </p>
            </div>

            <div>
              <span className="block text-2xl font-bold">Preço</span>
              <span>R$ {servicePrice}</span>
            </div>
          </div>
          <div className="bg-background h-[0.09rem] w-full md:hidden lg:block" />
        </CardContent>
        <div className="bg-background hidden min-h-full min-w-px md:block lg:hidden" />
        <AppointmentCardFooter id={id} />
      </div>
    </Card>
  );
}
