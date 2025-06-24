import { getAppointment } from "@/api/get-appointment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateRequest } from "@/utils/format-date-request";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CardFooter } from "./CardFooter";
import { useRemainingTime } from "@/hooks/useRemainingTime";
import { CardSkeleton } from "./CardSkeleton";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

interface NextAppointmentCardProps {
  portraitModeOnLg?: boolean;
}

export function NextAppointmentCard({
  portraitModeOnLg = false,
}: NextAppointmentCardProps) {
  const { data: nextAppointmentData, isFetching } = useQuery({
    queryKey: ["next-appointment"],
    queryFn: () => getAppointment({ filter: "next", status: "booked" }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const { date, startTime, services, id } = nextAppointmentData
    ? nextAppointmentData[0]
    : {
        date: new Date(),
        startTime: "00:00",
        services: [],
        id: 0,
      };

  const remainingTime = useRemainingTime({
    startDate: new Date(date),
    startTime,
  });

  const formatedDate = formatDateRequest(date);
  const totalPrice = services.reduce((acc, curr) => {
    return acc + Number(curr.price);
  }, 0);

  return (
    <>
      {isFetching ? (
        <CardSkeleton />
      ) : (
        <>
          {nextAppointmentData ? (
            <Card className="shadow-2xl lg:min-w-85">
              <CardHeader>
                <CardTitle
                  className={cn(
                    "text-xl font-bold md:text-2xl",
                    portraitModeOnLg && "lg:text-xl",
                  )}
                >
                  Próximo Horário marcado
                </CardTitle>
              </CardHeader>
              <div
                className={cn(
                  "md:flex md:flex-row md:justify-between md:gap-6",
                  portraitModeOnLg && "lg:flex-col",
                )}
              >
                <CardContent className="flex flex-col gap-6">
                  <div className="flex h-full flex-col gap-6 md:justify-between">
                    <div>
                      <ul>
                        <li>
                          <span className="font-bold">Data</span>:{" "}
                          {format(formatedDate, "PPPP", {
                            locale: ptBR,
                          })}
                        </li>
                        <li>
                          <span className="font-bold">Horário</span>:{" "}
                          {startTime}
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
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "bg-background h-[0.09rem] w-full md:hidden",
                      portraitModeOnLg && "lg:block",
                    )}
                  />
                </CardContent>
                <div
                  className={cn(
                    "bg-background hidden min-h-full min-w-px md:block",
                    portraitModeOnLg && "lg:hidden",
                  )}
                />
                <CardFooter
                  appointmentId={id}
                  portraitModeOnLg={portraitModeOnLg}
                />
              </div>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold md:text-2xl lg:text-xl">
                    Vc não tem horários marcados
                  </CardTitle>
                  <CardDescription>
                    Vc pode marcar um novo agendamento ou entrar em contato com
                    a barbearia!
                  </CardDescription>
                  <CardContent className="mt-12 p-0">
                    <div className="flex flex-col gap-6">
                      <Button
                        onClick={() => navigate("/to-schedule")}
                        className="w-full md:w-60 lg:w-full"
                      >
                        Novo agendamento
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full md:w-60 lg:w-full"
                      >
                        Falar com a barbearia
                      </Button>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
}
