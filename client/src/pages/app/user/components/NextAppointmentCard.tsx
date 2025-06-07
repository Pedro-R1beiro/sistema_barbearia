import { getAppointment } from "@/api/get-appointment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateRequest } from "@/utils/formatDateRequest";
import { remainingTime } from "@/utils/remaining-time";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NextApointmentCardFooter } from "./NextApointmentCardFooter";

interface NextAppointmentProps {
  type?: "primary" | "secondary";
}

export function NextAppointmentCard({
  type = "primary",
}: NextAppointmentProps) {
  const { data: nextAppointmentData } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment("next"),
  });

  if (!nextAppointmentData) return;
  const nextAppointment = nextAppointmentData[0];

  const formatedDate = formatDateRequest(nextAppointment.date);

  return (
    <Card
      className={`shadow-2xl lg:min-w-85 ${
        type === "secondary" && "bg-custom-foreground text-background"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl lg:text-xl">
          Próximo Horário marcado
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 md:flex-row md:justify-between lg:flex-col">
        <div className="flex h-full flex-col gap-6 md:justify-between">
          <div>
            <ul>
              <li>
                <p>
                  <span className="font-bold">Barbeiro</span>:{" "}
                  {nextAppointment.professionalName}
                </p>
              </li>
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
      <NextApointmentCardFooter id={nextAppointment.id} type={type} />
    </Card>
  );
}
