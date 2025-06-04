import { getAppointment } from "@/api/get-appointment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { remainingTime } from "@/utils/remaining-time";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
                  {format(nextAppointment.date, "PPPP", {
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

        <div
          className={`bg-foreground h-[0.01rem] max-h-full w-full md:h-[16rem] md:w-[0.1rem] lg:h-[0.1rem] lg:w-full ${
            type === "secondary" && "bg-background dark:bg-background"
          }`}
        />

        {type === "secondary" ? (
          <div className="max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
            <Button
              variant="secondary"
              className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
            >
              Falar com barbeiro
            </Button>
            <Button
              variant="secondary"
              className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
            >
              Ver mais informações
            </Button>
            <Button className="text-foreground w-full flex-1 bg-rose-600 py-5 font-bold hover:bg-rose-600/80 md:w-auto lg:flex-none">
              Cancelar agendamento
            </Button>
          </div>
        ) : (
          <div className="max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
            <Button className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none">
              Contatar barbeiro
            </Button>
            <Button className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none">
              Ver mais informações
            </Button>
            <Button
              className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
              variant="customDestructive"
            >
              Cancelar agendamento
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
